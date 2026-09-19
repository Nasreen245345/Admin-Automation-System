import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import ClockWidget from "../../components/attendance/ClockWidget";
import AttendanceHistoryTable from "../../components/attendance/AttendanceHistoryTable";

export default function AttendancePage() {
  // Bumped after every clock-in/out so the history table re-fetches.
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <PageHeader
        title="Attendance"
        description="Clock in and out, and review your attendance history."
      />
      <ClockWidget onChange={() => setRefreshKey((k) => k + 1)} />
      <section className="flex flex-col gap-3">
        <h2 className="text-section-heading text-ink">My attendance history</h2>
        <AttendanceHistoryTable refreshKey={refreshKey} />
      </section>
    </>
  );
}
