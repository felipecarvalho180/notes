import { ChangeEvent, useState } from "react";
import Logo from "./assets/logo-nlw-expert.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

interface Node {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Node[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");
    return notesOnStorage ? JSON.parse(notesOnStorage) : [];
  });

  function handleNewNode(content: string) {
    const newNote: Node = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const newNotes = [newNote, ...notes];

    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setSearch(value);
  }

  function handleDeleteNote(id: string) {
    setNotes((prevState) => prevState.filter((note) => note.id !== id));
  }

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5 xl:px-0">
      <img src={Logo} alt="Logo" />

      <form className="w-full">
        <input
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
          type="text"
          placeholder="Busque em suas notas..."
          onChange={handleSearch}
          value={search}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard onNewNode={handleNewNode} />

        {notes
          .filter((note) =>
            note.content.toLowerCase().includes(search.toLowerCase())
          )
          .map((note) => (
            <NoteCard
              note={note}
              key={note.id}
              onDeleteNote={handleDeleteNote}
            />
          ))}
      </div>
    </div>
  );
}
