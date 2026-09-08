import { useState } from "react";
import { Menu, Bell, ChevronDown, LogOut, User, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * Top header: mobile menu trigger, page context, notifications, and the
 * user profile menu. Kept visually lightweight per the design brief.
 */
export default function Header({ onMenuClick }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between gap-4 px-4 sm:px-6 bg-white border-b border-border">
      <button
        onClick={onMenuClick}
        className="lg:hidden h-9 w-9 rounded-md flex items-center justify-center text-ink-secondary hover:bg-surface-subtle"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-2 sm:gap-3 ml-auto">
        <Link
          to="/notifications"
          className="relative h-9 w-9 rounded-md flex items-center justify-center text-ink-secondary hover:bg-surface-subtle"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-status-error" />
        </Link>

        <div className="relative">
          <button
            onClick={() => setProfileOpen((o) => !o)}
            className="flex items-center gap-2 h-9 pl-1.5 pr-2.5 rounded-md hover:bg-surface-subtle"
          >
            <span className="h-7 w-7 rounded-full bg-primary text-white text-helper font-semibold flex items-center justify-center flex-shrink-0">
              {(user?.name || "A").charAt(0).toUpperCase()}
            </span>
            <span className="hidden sm:block text-body font-medium text-ink">
              {user?.name || "Admin User"}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-ink-muted" />
          </button>

          {profileOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 mt-2 w-52 bg-white border border-border rounded-md shadow-elevated z-20 py-1.5">
                <Link
                  to="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2 text-body text-ink-secondary hover:bg-surface-subtle"
                >
                  <User className="h-4 w-4" /> Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2 text-body text-ink-secondary hover:bg-surface-subtle"
                >
                  <Settings className="h-4 w-4" /> Settings
                </Link>
                <div className="my-1.5 border-t border-border" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-body text-status-error hover:bg-status-errorBg"
                >
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
