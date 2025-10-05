"use client";
import { useState } from "react";

type Card = { id: number; title: string };
type Col = "Todo" | "Doing" | "Done";

export default function Dashboard() {
  const [cols, setCols] = useState<Record<Col, Card[]>>({
    Todo: [{ id: 1, title: "Example task" }],
    Doing: [],
    Done: [],
  });
  const [title, setTitle] = useState("");

  const addCard = () => {
    if (!title.trim()) return;
    setCols(c => ({ ...c, Todo: [...c.Todo, { id: Date.now(), title }] }));
    setTitle("");
  };

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="flex gap-2">
        <input
          className="border rounded px-3 py-2"
          placeholder="New task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button className="bg-black text-white px-4 py-2 rounded" onClick={addCard}>
          Add
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(["Todo","Doing","Done"] as Col[]).map(col => (
          <div key={col} className="bg-gray-50 rounded-2xl p-4 shadow">
            <h2 className="font-semibold mb-3">{col}</h2>
            <ul className="space-y-2">
              {cols[col].map(card => (
                <li key={card.id} className="rounded border p-2 bg-white">{card.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
