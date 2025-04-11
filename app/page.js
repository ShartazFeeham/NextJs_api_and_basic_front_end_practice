"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("/api/notes");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNotes(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Failed to fetch notes.");
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("/api/notes");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNotes(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Failed to fetch notes.");
        setLoading(false);
      }
    };

    fetchNotes();
  }, [refresh]);

  if (loading) {
    return <div>Loading notes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        alert(`HTTP error! status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setRefresh(!refresh);
    } catch (err) {
      alert(`HTTP error! status: ${err}`);
      console.error("Error deleting note:", err);
    }
  };

  const handleAddNote = async (message) => {
    if (!message) {
      alert("Please enter a note.");
      return;
    }

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) {
        alert(`HTTP error! status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setRefresh(!refresh);
    } catch (err) {
      alert(`HTTP error! status: ${err}`);
      console.error("Error adding note:", err);
    }
  }

  return (
    <div style={{ padding: "20px", margin: "20px", border: "1px solid white" }}>
      <h1>My Notes</h1>
      <hr></hr>
      <br></br>
      <input placeholder="Add new note" id="newNoteInput" style={{
        padding: "5px",
        margin: "5px",
        borderRadius: "5px",
        fontSize: "16px",
        border: "1px solid white",
      }}></input> 
      <button
      style={{
        margin: "5px",
        fontSize: "16px",
        backgroundColor: "green",
        padding: "5px",
        border: "2 px solid red",
        borderRadius: "5px",
        cursor: "pointer",
      }}
      onClick={() => handleAddNote(document.getElementById("newNoteInput").value)}
    >
      Save
    </button>
      {notes.length === 0 ? (
        <p>No notes available.</p>
      ) : (
        <div>
          {notes.map((note) => (
            <div key={note.id}>
              {note.id}. {note.message}{" "}
              <button
                style={{
                  margin: "5px",
                  backgroundColor: "red",
                  padding: "5px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
