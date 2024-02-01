import { useEffect, useState } from 'react'
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import './styles/index.css';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes(){
      try{
        const response = await fetch("http://localhost:3600/api/notes", {method: "GET"});
        const notes = await response.json();
        setNotes(notes)
      }catch(err){
        console.log(err);
        alert(err);
      }
      
    }
    loadNotes();
  },[])

  return (
    <>
      {notes.map(note => (
        <Note note={note} key={note._id}/>
      ))};
    </>

  )
}
export default App
