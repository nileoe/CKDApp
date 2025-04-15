/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { getUserCalculations } from "../../backend/calculationActions";
import { getCurrentUser } from "../../backend/userActions";
import "./PastResults.scss";

const PastResults = () => {
  const [user, setUser] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      //await account.updatePrefs({ role: "admin" });
      try {
        const loggedInUser = await getCurrentUser();
        console.log("Logged-in User:", loggedInUser);

        setUser(loggedInUser);

        if (loggedInUser) {
          const role = loggedInUser.prefs?.role;
          console.log("User Role:", role);

          const data =
            role === "admin"
              ? await getUserCalculations("all")
              : await getUserCalculations(loggedInUser.$id);

          console.log("Fetched Results:", data);
          setResults(data);
        }
      } catch (err) {
        console.error("Error fetching past results:", err);
      }
    };

    fetchResults();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedItem((prev) => (prev === id ? null : id));
  };

  const filteredResults = results.filter((item) =>
    `${item.ckdStage} ${item.eGFRResult} ${item.$createdAt}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pastResultsContainer">
      <div className="header">
        <div className="searchInput">
          <input
            type="text"
            placeholder="Date, eGFR or CKD Stage"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="filterBtn">
          Filter <span>&#x1F5C3;</span>
        </button>
      </div>

      <ul className="resultsList">
        {filteredResults.map((item) => (
          <li
            key={item.$id}
            className={`resultItem ${
              expandedItem === item.$id ? "expanded" : ""
            }`}
            onClick={() => toggleExpand(item.$id)}
          >
            <div className="summary">
              {new Date(item.$createdAt).toLocaleDateString()} –{" "}
              {item.eGFRResult} – Stage {item.ckdStage}
            </div>

            <div className="details">
              <p>
                <strong>Age:</strong> {item.userAge}
              </p>
              <p>
                <strong>Sex:</strong> {item.userSex}
              </p>
              <p>
                <strong>Ethnicity:</strong> {item.userEthnicity}
              </p>
              <p>
                <strong>Creatinine:</strong> {item.creatinineLevel}{" "}
                {item.creatinineUnit}
              </p>
              <p>
                <strong>Description:</strong> {item.ckdDescription}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PastResults;
