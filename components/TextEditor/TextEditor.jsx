"use client";
import { Editor } from "@tinymce/tinymce-react";
import React from "react";

export default function TextEditor() {
    const handleEditorChange = (content, editor) => {
        console.log("Editor content was updated: ", content);
    };
    return (
        <Editor
            apiKey={process.env.NEXT_PUBLIC_TINY_MCE}
            initialValue="<p>This is the initial content of the editor</p>"
            init={{
                height: 500,
                menubar: true,
                plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "print",
                    "preview",
                    "searchreplace",
                    "wordcount",
                ],
                toolbar:
                    "undo redo | formatselect | bold italic | alignleft aligncenter alignright | outdent indent | link image",

            }}
        />
    );
}
