export default function Input({ onChangeHandler }) {
  return (
    <div>
      <label htmlFor="date" className="w-100">
        Date of birth
        <input
          id="date"
          className="form-control mb-3"
          type="date"
          onChange={(e) => onChangeHandler(e.target.value)}
        />
      </label>
    </div>
  );
}
