import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { attendanceService } from "../../services/attendanceService";
import Table from "../tables/Table";
import Badge from "../common/Badge";
import {
  formatDate,
  formatTime,
  formatDuration,
  statusBadgeKey,
} from "../../utils/attendanceFormat";

const PAGE_SIZE = 10;

const columns = [
  { key: "date", header: "Date", render: (row) => formatDate(row.date) },
  { key: "clockIn", header: "Clock in", render: (row) => (row.clockIn ? formatTime(row.clockIn) : "—") },
  { key: "clockOut", header: "Clock out", render: (row) => (row.clockOut ? formatTime(row.clockOut) : "—") },
  {
    key: "workedMinutes",
    header: "Worked",
    // workedMinutes is only final once the day is clocked out.
    render: (row) => (row.clockOut ? formatDuration(row.workedMinutes) : "—"),
  },
  { key: "status", header: "Status", render: (row) => <Badge status={statusBadgeKey[row.status]} /> },
  {
    key: "notes",
    header: "Notes",
    render: (row) =>
      row.notes ? (
        <span className="block max-w-[16rem] truncate" title={row.notes}>
          {row.notes}
        </span>
      ) : (
        "—"
      ),
  },
];

/**
 * The signed-in user's own attendance history, newest first. Always filters by
 * the current user's id — managers can read everyone's records via the API, but
 * this table is "my history". Change `refreshKey` to re-fetch (e.g. after a
 * clock-in/out) without flashing the loading skeleton.
 */
export default function AttendanceHistoryTable({ refreshKey = 0 }) {
  const { user } = useAuth();
  const userId = user?._id;

  const [page, setPage] = useState(1);
  const [attempt, setAttempt] = useState(0);
  // `page` here is the page the data belongs to; loading = requested page hasn't arrived yet.
  const [result, setResult] = useState({ page: null, items: [], pagination: null, failed: false });
  const loading = result.page !== page;

  useEffect(() => {
    let cancelled = false;
    attendanceService
      .list({ userId, page, pageSize: PAGE_SIZE })
      .then(({ items, pagination }) => {
        if (!cancelled) setResult({ page, items, pagination, failed: false });
      })
      .catch(() => {
        if (!cancelled) setResult({ page, items: [], pagination: null, failed: true });
      });
    return () => {
      cancelled = true;
    };
  }, [userId, page, refreshKey, attempt]);

  const retry = () => {
    setResult((r) => ({ ...r, page: null }));
    setAttempt((a) => a + 1);
  };

  const { pagination } = result;

  return (
    <Table
      columns={columns}
      data={result.items}
      keyField="_id"
      loading={loading}
      error={!loading && result.failed}
      onRetry={retry}
      emptyTitle="No attendance yet"
      emptyDescription="Your clock-ins will show up here."
      pagination={
        pagination && {
          page: pagination.page,
          totalPages: pagination.totalPages,
          totalItems: pagination.totalItems,
          pageSize: pagination.pageSize,
          onPageChange: setPage,
        }
      }
    />
  );
}
