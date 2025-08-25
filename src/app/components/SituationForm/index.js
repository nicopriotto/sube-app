import "./situation.css"

function Situation() {
  return (
    <div className="situation">
      <h2>Propose a New Situation</h2>
      
      <form className="situation-form">
        <div className="form-group">
          <label htmlFor="title">Situation Title</label>
          <input type="text" id="title" placeholder="Enter title" />
        </div>

        <div className="form-group">
          <label htmlFor="description">Detailed Description</label>
          <textarea id="description" placeholder="Describe the situation..." rows="4"></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="person">Select Person Involved</label>
          <select id="person">
            <option value="">Choose a person</option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
          </select>
        </div>

        <button type="submit">Submit Situation</button>
      </form>
    </div>
  )
}

export default Situation
