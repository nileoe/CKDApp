/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../../types/UserTypes";
import "./AccountView.scss";

interface AccountPageProps {
  account: User;
}

const AccountView = ({ account }: AccountPageProps) => {
  // initialization -----------
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const daysSinceRegistration = () => {
    const registrationDate = new Date(account.registration);
    const today = new Date();
    const diffTime = Math.abs(today.getDay() - registrationDate.getDay());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // State -------------
  const isAdmin = account?.prefs?.role === "admin";
  const userRoleLabel = isAdmin ? "Doctor" : "Clinician";

  // Handlers ----------
  // View -----------
  return (
    <div className="account-page">
      <div className="account-container">
        <header className="account-header">
          <div className="user-info">
            <div className="avatar">{account.name.charAt(0).toUpperCase()}</div>
            <div className="user-details">
              <h1>{account.name}'s Account</h1>
              <p>
                Member since{" "}
                {new Date(account.registration).toLocaleDateString()}
              </p>
            </div>
            <div className="status-badge">
              <span className={isAdmin ? "doctor-badge" : "clinician-badge"}>
                {userRoleLabel}
              </span>
            </div>
          </div>
        </header>

        <div className="account-layout">
          <div className="main-column">
            <section className="account-section">
              <h2>Account Information</h2>

              <div className="info-grid">
                <div className="info-column">
                  <h3>Personal Details</h3>
                  <div className="detail-list">
                    <div className="detail-item">
                      <dt>Email Address</dt>
                      <dd className="email-wrapper">
                        {account.email}
                        <span
                          className={`verification-badge ${
                            account.emailVerification
                              ? "verified"
                              : "unverified"
                          }`}
                        >
                          {account.emailVerification
                            ? "Verified"
                            : "Unverified"}
                        </span>
                      </dd>
                    </div>
                    <div className="detail-item">
                      <dt>Phone Number</dt>
                      <dd>{account.phone || "Not provided"}</dd>
                    </div>
                  </div>
                </div>

                <div className="info-column">
                  <h3>Security</h3>
                  <div className="detail-list">
                    <div className="detail-item">
                      <dt>Multi-Factor Authentication</dt>
                      <dd>
                        <span
                          className={`status-indicator ${
                            account.mfa ? "enabled" : "disabled"
                          }`}
                        >
                          {account.mfa ? "Enabled" : "Disabled"}
                        </span>
                      </dd>
                    </div>
                    <div className="detail-item">
                      <dt>Phone Verification</dt>
                      <dd>
                        <span
                          className={`status-indicator ${
                            account.phoneVerification ? "enabled" : "disabled"
                          }`}
                        >
                          {account.phoneVerification
                            ? "Verified"
                            : "Unverified"}
                        </span>
                      </dd>
                    </div>
                    <div className="detail-item">
                      <dt>Password Last Updated</dt>
                      <dd>{formatDate(account.passwordUpdate)}</dd>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="account-section">
              <h2>Authentication Methods</h2>

              <div className="auth-methods">
                {account.targets.map((target) => (
                  <div key={target.$id} className="auth-method-card">
                    <div className="auth-method-content">
                      <div className="provider-info">
                        <span className="provider-type">
                          {target.providerType || "Email"}
                        </span>
                        <p className="identifier">{target.identifier}</p>
                      </div>
                      <span
                        className={`method-status ${
                          target.expired ? "expired" : "active"
                        }`}
                      >
                        {target.expired ? "Expired" : "Active"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="sidebar-column">
            <section className="account-section">
              <h2>Activity</h2>

              <div className="detail-list">
                <div className="detail-item">
                  <dt>Account Created</dt>
                  <dd>{formatDate(account.registration)}</dd>
                  <dd className="subtext">
                    {daysSinceRegistration()} days ago
                  </dd>
                </div>
                <div className="detail-item">
                  <dt>Last Active</dt>
                  <dd>{formatDate(account.accessedAt)}</dd>
                </div>
                <div className="detail-item">
                  <dt>Last Updated</dt>
                  <dd>{formatDate(account.$updatedAt)}</dd>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AccountView;
