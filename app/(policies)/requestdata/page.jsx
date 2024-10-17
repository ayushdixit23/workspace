

"use client";
import React, { useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");
  const [page, setPage] = useState(false);

  const send = () => {
    if (!email) return;
    setEmail("");
    setPage(true);
  };
  return (
    <>
      <div className="flex flex-col mt-5 justify-center px-[5%] gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold py-2">
            Account Deletion Request
          </h1>

          <div>
            Thank you for using Grovyo. If you wish to delete your account and
            associated data, please follow the steps below:
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className=" font-bold">
            Enter email address associated with your account
          </h1>

          <input
            type="text"
            value={email}
            className="p-2 border-b w-[50%] bg-transparent outline-none"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
          />

          <div className="flex items-center">
            <button
              disabled={!email}
              className=" px-[80px] py-4
			 text-white bg-[#127DF7] rounded-3xl cursor-pointer mt-4"
              onClick={send}
            >
              Verify &#8594;
            </button>
          </div>
        </div>
        {page && (
          <div>Your Deletion request has been submiited successfully.</div>
        )}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">Data Removal:</h1>
            <div>
              Upon submitting your account deletion request, the following data
              will be removed:
            </div>
            <div>Personal Information: Name,Email, Number</div>
            <div>
              Usage Data: Activity and Preferences and Content Recommendation
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">Retention Period:</h1>
            <div>
              We retain certain data for a limited period to comply with legal
              obligations or for necessary business purposes. The retention{" "}
              <br />
              period is as follows:
            </div>
            <div>90 Days</div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">Additional Information:</h1>
            <div>
              For more details on our data handling practices, please refer to
              our Privacy Policy.
            </div>
            <div>
              If you encounter any issues or have questions about the account
              deletion process, please contact our support team at
              contact@grovyo.com.
            </div>
            <div>
              Note: Account deletion is irreversible, and you won't be able to
              recover your data once the process is complete.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
