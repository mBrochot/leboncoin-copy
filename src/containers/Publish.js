import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Dropzone from "react-dropzone";
import { useHistory } from "react-router-dom";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState({});
  const token = Cookies.get("token");
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="publish">
      <div className="publish-h1">
        <h1>Déposer un annonce</h1>
      </div>
      <span className="publishError">{errorMessage}</span>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (title && description && price && file) {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("picture", file);

            const response = await axios.post(
              `https://le-bon-coin-api.herokuapp.com/offer/publish`,
              formData,
              {
                headers: { authorization: "Bearer " + token },
              }
            );
            history.push(`/offer/${response.data._id}`);
          } else {
            setErrorMessage("Tous les champs ne sont pas remplis.");
          }
        }}
      >
        <div>
          <span>Titre de l'annonce &#42;</span>
          <br />
          <input
            className="publish-titre"
            type="text"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <br />
          <span>Texte de l'annonce &#42;</span>
          <br />
          <textarea
            className="publish-text"
            type="text"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <br />
          <span>Prix &#42;</span>
          <br />
          <input
            className="publish-price"
            type="text"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
          <span className="euro">€</span>
          <br />
          <span>Photo &#42;</span>
          <br />
          <Dropzone onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <input
                    className="dragNDrop"
                    value={file.name}
                    placeholder="Glissez votre photo - ICI -"
                  />
                </div>
              </section>
            )}
          </Dropzone>
          <br />
        </div>
        <button className="publish-btn" type="submit">
          Valider
        </button>
      </form>
    </div>
  );
};

export default Publish;
