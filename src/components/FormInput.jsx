function FormInput({ type, label, placeholder, name, error, errorText }) {
  return (
    <label className="form-control w-full mb-2">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered w-full ${error}`}
        name={name}
      />
      {errorText && (
        <div className="label">
          <span className="label-text-alt">{errorText}</span>
        </div>
      )}
    </label>
  );
}

export default FormInput;
