/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  fetchPediatricResults,
  getPaediatricCal,
} from "../../backend/calculationActions";
import { getCurrentUser } from "../../backend/userActions";
import "./PaediatricsResults.scss";

const PaediatricsResults = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResults = results.filter((result) => {
    const term = searchTerm.toLowerCase().trim();
    const eGFR = result.eGFRResult?.toLowerCase() || "";
    const sex = result.userSex?.toLowerCase() || "";
    return eGFR.includes(term) || sex.includes(term);
  });

  useEffect(() => {
    const loadResults = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          const role = user.prefs?.role;
          const data: any[] =
            role === "admin"
              ? await getPaediatricCal("all")
              : await fetchPediatricResults(user.$id);

          setResults(data);
        }
      } catch (error) {
        console.error("Error loading pediatric results:", error);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="pastResultsContainer">
      <div className="header">
        <div className="searchInput">
          <input
            type="text"
            placeholder="Search by eGFR or sex"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button className="filterBtn">Filter</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredResults.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul className="resultsList">
          {filteredResults.map((result) => (
            <li
              key={result.$id}
              className={`resultItem ${
                expandedId === result.$id ? "expanded" : ""
              }`}
              onClick={() => toggleExpand(result.$id)}
            >
              <div className="summary">
                eGFR: <strong>{result.eGFRResult}</strong> | Age:{" "}
                {result.userAge} | Sex: {result.userSex}
              </div>

              <div className="details">
                <p>
                  <strong>Height:</strong> {result.height} cm
                  <br />
                  <strong>Creatinine:</strong> {result.creatinine} {result.unit}
                  <br />
                  <strong>Calculated At:</strong>{" "}
                  {new Date(result.$createdAt).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaediatricsResults;
