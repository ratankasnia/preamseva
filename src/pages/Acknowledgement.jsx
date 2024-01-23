import React from "react";

function Acknowledgement() {
  return (
    <div className="mx-auto mt-5 max-w-7xl px-5">
      <div className="mt-6 text-center text-2xl font-semibold">
        Acknowlegements
      </div>

      <div className="mt-5">
        <p className="text-sm text-gray-500">
          Prem Seva is grateful to Rotherham NHS Foundation trust for the use of
          the clinical skills suite and videography for care video creation.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          We are also grateful to Biztech Ltd and{" "}
          <a
            rel="noreferrer"
            target="_blank"
            className="text-blue-500"
            href="https://www.sgvsofttech.com/"
          >
            SVG Softtech
          </a>{" "}
          for their work in designing and developing the Prem Seva website and
          app.
        </p>
        <br />
      </div>
    </div>
  );
}

export default Acknowledgement;
