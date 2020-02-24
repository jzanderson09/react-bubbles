import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = props => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    const id = colorToEdit.id;
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${id}`, colorToEdit)
      .then(window.alert('Success!  Color updated!'))
      .catch(err => console.log(err));
  };

  const deleteColor = color => {
    const confirmed = window.confirm('Are you sure you want to delete this color?');
    if (confirmed) {
      axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(window.alert('Success!  Color deleted!'))
      .catch(err => console.log(err));
    }
    window.location.reload();
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {props.colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
        {/* <form>
          <input 
            name = 
          />

          <input 
          
          />
        </form> */}
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
