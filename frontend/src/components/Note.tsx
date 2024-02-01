import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import "../styles/noteModule.css";

interface NoteProps {
    note: NoteModel;
}

function Note({ note }: NoteProps) {
    const {
        title,
        text,
        createdAt,
        updatedAt
    } = note;
    return (
        <div>
            <Card className="noteCard">
                <Card.Body>
                    <Card.Title>
                        {title}
                    </Card.Title>
                    <Card.Text className="cardText">
                        {text}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Note;
