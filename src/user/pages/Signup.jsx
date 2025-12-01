import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// 🔧 adjust paths as needed for your project structure
import traveler_logo from "../../assets/traveler_logo.png";
import axios from "../api/axios";
import { API_CONFIG } from "../../config/environment"

export default function Signup() {
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const errorRef = useRef(null);

  // wizard step
  const [step, setStep] = useState(1);

  // type + account info
  const [userType, setUserType] = useState("TRAVELLER"); // TRAVELLER | SERVICE_PROVIDER
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  // profile details
  const [gender, setGender] = useState(""); // required for provider, optional for traveller
  const [dob, setDob] = useState(""); // yyyy-mm-dd

  // contact + address / location
  const [contactNumber, setContactNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");

  // provider verification
  const [idNumber, setIdNumber] = useState(""); // NIC / Passport / BR number
  const [idDocumentFile, setIdDocumentFile] = useState(null); // image file (not sent yet, but validated)

  // bank (only for providers)
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [swiftCode, setSwiftCode] = useState("");

  const [errMsg, setErrMsg] = useState("");

  // travellers: 2 steps, providers: 4 steps
  const totalSteps = userType === "SERVICE_PROVIDER" ? 4 : 2;

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [
    step,
    userType,
    name,
    email,
    password,
    confirmPwd,
    gender,
    dob,
    contactNumber,
    addressLine1,
    city,
    country,
    googleMapsUrl,
    idNumber,
    idDocumentFile,
    bankName,
    accountName,
    accountNumber,
  ]);

  const showError = (title, text) => {
    setErrMsg(text);
    Swal.fire({
      icon: "warning",
      title,
      text,
      confirmButtonColor: "#0f766e",
    });
  };

  const validateStep = () => {
    // STEP 1: type + account + profile
    if (step === 1) {
      if (!name || !email || !password || !confirmPwd) {
        showError("Incomplete details", "Please fill all required fields.");
        return false;
      }
      if (password !== confirmPwd) {
        showError("Password mismatch", "Passwords do not match.");
        return false;
      }

      if (userType === "SERVICE_PROVIDER") {
        if (!gender || !dob) {
          showError(
            "More details needed",
            "Gender and date of birth are required for service providers."
          );
          return false;
        }
      }
    }

    // STEP 2: contact + address/map (both types)
    if (step === 2) {
      if (!contactNumber) {
        showError("Contact required", "Please enter a contact number.");
        return false;
      }

      const hasAddress =
        addressLine1.trim() !== "" &&
        city.trim() !== "" &&
        country.trim() !== "";
      const hasMap = googleMapsUrl.trim() !== "";

      if (userType === "TRAVELLER") {
        if (!hasAddress) {
          showError(
            "Address required",
            "Please fill Address Line 1, City and Country."
          );
          return false;
        }
      } else if (userType === "SERVICE_PROVIDER") {
        if (!hasAddress && !hasMap) {
          showError(
            "Location required",
            "Please provide either a full address or a Google Maps location link."
          );
          return false;
        }
      }
    }

    // STEP 3: business details + verification (only for provider)
    if (step === 3 && userType === "SERVICE_PROVIDER") {
      if (!idNumber || !idDocumentFile) {
        showError(
          "Verification required",
          "Please provide your NIC/Passport/BR number and upload the document image."
        );
        return false;
      }
    }

    // STEP 4: bank (only for provider)
    if (step === 4 && userType === "SERVICE_PROVIDER") {
      if (!bankName || !accountName || !accountNumber) {
        showError(
          "Bank details required",
          "Please fill bank name, account holder name and account number."
        );
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep()) return;

    try {
      // NOTE: idDocumentFile is NOT sent yet (would need FormData + backend support)
      const payload = {
        name,
        email,
        password,
        type: userType,
        gender: gender || null,
        dateOfBirth: dob || null,
        contactNumber,
        addressLine1: addressLine1 || null,
        addressLine2: addressLine2 || null,
        city: city || null,
        state: state || null,
        postalCode: postalCode || null,
        country: country || null,
        googleMapsUrl: googleMapsUrl || null,
        idNumber: userType === "SERVICE_PROVIDER" ? idNumber : null,
        // bank info only for providers
        bankName: userType === "SERVICE_PROVIDER" ? bankName : null,
        accountName: userType === "SERVICE_PROVIDER" ? accountName : null,
        accountNumber: userType === "SERVICE_PROVIDER" ? accountNumber : null,
        branch: userType === "SERVICE_PROVIDER" ? branch : null,
        swiftCode: userType === "SERVICE_PROVIDER" ? swiftCode : null,
      };

      const response = await axios.post(
        API_CONFIG.ENDPOINTS.AUTH.REGISTER,
        payload
      );

      console.log("SIGNUP RESPONSE:", response.data);

      Swal.fire({
        icon: "success",
        title: "Account created!",
        text: "Your account has been created successfully. You can now log in.",
        confirmButtonColor: "#0f766e",
      });

      // reset all fields
      setStep(1);
      setUserType("TRAVELLER");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPwd("");
      setGender("");
      setDob("");
      setContactNumber("");
      setAddressLine1("");
      setAddressLine2("");
      setCity("");
      setState("");
      setPostalCode("");
      setCountry("");
      setGoogleMapsUrl("");
      setIdNumber("");
      setIdDocumentFile(null);
      setBankName("");
      setAccountName("");
      setAccountNumber("");
      setBranch("");
      setSwiftCode("");

      navigate("/login", { replace: true });
    } catch (err) {
      console.log("AXIOS ERROR:", err);
      console.log("AXIOS ERROR.response:", err?.response);

      let errorMessage = "Signup Failed";

      if (!err?.response) {
        errorMessage = "No Server Response";
      } else if (err.response?.status === 400) {
        errorMessage = "Missing or invalid fields";
      } else if (err.response?.status === 409) {
        errorMessage = "User already exists";
      }

      setErrMsg(errorMessage);

      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: errorMessage,
        confirmButtonColor: "#0f766e",
      });
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="h-24 w-full flex items-center justify-center overflow-hidden border-b border-gray-100 mb-4">
            <img
              src={traveler_logo}
              alt="traveler logo"
              className="w-60 h-32 object-contain rounded-lg transition-transform hover:scale-105 duration-500"
            />
          </div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
            Create your Travler account
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1 text-center">
            Step {step} of {totalSteps}
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex justify-center mb-6 gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => {
            const s = i + 1;
            return (
              <div
                key={s}
                className={`h-2 w-10 rounded-full ${
                  step >= s ? "bg-teal-600" : "bg-slate-200"
                }`}
              />
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* STEP 1: Type + account + profile */}
          {step === 1 && (
            <>
              {/* Type */}
              <div className="space-y-1">
                <span className="block text-sm font-medium text-slate-700">
                  I am a
                </span>
                <div className="flex items-center gap-4 text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="userType"
                      value="TRAVELLER"
                      checked={userType === "TRAVELLER"}
                      onChange={(e) => setUserType(e.target.value)}
                      className="text-teal-600 focus:ring-teal-500"
                    />
                    <span>Traveller</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="userType"
                      value="SERVICE_PROVIDER"
                      checked={userType === "SERVICE_PROVIDER"}
                      onChange={(e) => setUserType(e.target.value)}
                      className="text-teal-600 focus:ring-teal-500"
                    />
                    <span>Service Provider</span>
                  </label>
                </div>
              </div>

              {/* Name */}
              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  ref={nameRef}
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="youremail@example.com"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-slate-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="••••••••"
                  onChange={(e) => setConfirmPwd(e.target.value)}
                  value={confirmPwd}
                  required
                  className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              {/* Profile details (gender + dob) */}
              <div className="mt-4 space-y-2">
                {userType === "TRAVELLER" && (
                  <p className="text-xs text-slate-500">
                    These details are{" "}
                    <span className="font-semibold">optional</span> and help us
                    give you better, more personalised trip suggestions.
                  </p>
                )}
                {userType === "SERVICE_PROVIDER" && (
                  <p className="text-xs text-slate-500">
                    Gender and date of birth are{" "}
                    <span className="font-semibold">required</span> for
                    verification and service quality.
                  </p>
                )}

                {/* Gender */}
                <div className="space-y-1">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  >
                    <option value="">Select gender</option>
                    <option value="FEMALE">Female</option>
                    <option value="MALE">Male</option>
                    <option value="OTHER">Other</option>
                    <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
                  </select>
                </div>

                {/* Date of Birth */}
                <div className="space-y-1">
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>
            </>
          )}

          {/* STEP 2: Contact + Address / Map */}
          {step === 2 && (
            <>
              {/* Contact number */}
              <div className="space-y-1">
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-slate-700"
                >
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contact"
                  placeholder="+94 7X XXX XXXX"
                  autoComplete="off"
                  onChange={(e) => setContactNumber(e.target.value)}
                  value={contactNumber}
                  required
                  className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div className="mt-2">
                {userType === "TRAVELLER" && (
                  <p className="text-xs text-slate-500">
                    Add your address so we can tailor pickup points and nearby
                    recommendations for you.
                  </p>
                )}
                {userType === "SERVICE_PROVIDER" && (
                  <p className="text-xs text-slate-500">
                    You can share your{" "}
                    <span className="font-semibold">
                      full address or just a Google Maps location link
                    </span>{" "}
                    so travellers can easily find you.
                  </p>
                )}
              </div>

              {/* Address fields */}
              <div className="space-y-1">
                <label
                  htmlFor="address1"
                  className="block text-sm font-medium text-slate-700"
                >
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="address1"
                  placeholder="House no, street"
                  autoComplete="off"
                  onChange={(e) => setAddressLine1(e.target.value)}
                  value={addressLine1}
                  className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="address2"
                  className="block text-sm font-medium text-slate-700"
                >
                  Address Line 2 (optional)
                </label>
                <input
                  type="text"
                  id="address2"
                  placeholder="Apartment, area"
                  autoComplete="off"
                  onChange={(e) => setAddressLine2(e.target.value)}
                  value={addressLine2}
                  className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-slate-700"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    placeholder="City"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-slate-700"
                  >
                    State / Province
                  </label>
                  <input
                    type="text"
                    id="state"
                    placeholder="State / Province"
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                    className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label
                    htmlFor="postal"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postal"
                    placeholder="Postal code"
                    onChange={(e) => setPostalCode(e.target.value)}
                    value={postalCode}
                    className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    placeholder="Country"
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                    className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>

              {/* Google Maps URL */}
              <div className="space-y-1">
                <label
                  htmlFor="googleMapsUrl"
                  className="block text-sm font-medium text-slate-700"
                >
                  Google Maps Location Link
                </label>
                <input
                  type="url"
                  id="googleMapsUrl"
                  placeholder="https://maps.google.com/..."
                  onChange={(e) => setGoogleMapsUrl(e.target.value)}
                  value={googleMapsUrl}
                  className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>
            </>
          )}

          {/* STEP 3: Business + Verification (providers only) */}
          {step === 3 && userType === "SERVICE_PROVIDER" && (
            <>
              <div className="mt-2 mb-1">
                <p className="text-sm font-semibold text-slate-800">
                  Identity / Business Verification
                </p>
                <p className="text-xs text-slate-500">
                  Add your NIC, passport, or business registration number and
                  upload a clear photo or scan of the document.
                </p>
              </div>

              {/* NIC / BR Number */}
              <div className="space-y-1">
                <label
                  htmlFor="idNumber"
                  className="block text-sm font-medium text-slate-700"
                >
                  NIC / Passport / BR Number
                </label>
                <input
                  type="text"
                  id="idNumber"
                  placeholder="e.g. 991234567V / N1234567 / BR-2024-00123"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  required
                  className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              {/* Document image upload */}
              <div className="space-y-1">
                <label
                  htmlFor="idDocumentFile"
                  className="block text-sm font-medium text-slate-700"
                >
                  NIC / Passport / BR Image
                </label>
                <input
                  type="file"
                  id="idDocumentFile"
                  accept="image/*"
                  onChange={(e) =>
                    setIdDocumentFile(e.target.files?.[0] || null)
                  }
                  className="w-full text-sm text-slate-600 file:mr-4 file:py-2.5 file:px-4 
                             file:rounded-xl file:border-0 file:text-sm file:font-semibold
                             file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Upload a clear photo or scan (JPG, PNG). Make sure the text is
                  readable.
                </p>
              </div>
            </>
          )}

          {/* STEP 4: Bank details (providers only) */}
          {step === 4 && userType === "SERVICE_PROVIDER" && (
            <>
              <div className="space-y-1">
                <label
                  htmlFor="bankName"
                  className="block text-sm font-medium text-slate-700"
                >
                  Bank Name
                </label>
                <input
                  type="text"
                  id="bankName"
                  placeholder="Bank name"
                  onChange={(e) => setBankName(e.target.value)}
                  value={bankName}
                  required
                  className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="accountName"
                  className="block text-sm font-medium text-slate-700"
                >
                  Account Holder Name
                </label>
                <input
                  type="text"
                  id="accountName"
                  placeholder="Name on account"
                  onChange={(e) => setAccountName(e.target.value)}
                  value={accountName}
                  required
                  className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="accountNumber"
                  className="block text-sm font-medium text-slate-700"
                >
                  Account Number
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  placeholder="Account number"
                  onChange={(e) => setAccountNumber(e.target.value)}
                  value={accountNumber}
                  required
                  className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label
                    htmlFor="branch"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Branch
                  </label>
                  <input
                    type="text"
                    id="branch"
                    placeholder="Branch"
                    onChange={(e) => setBranch(e.target.value)}
                    value={branch}
                    className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="swift"
                    className="block text-sm font-medium text-slate-700"
                  >
                    SWIFT / BIC (optional)
                  </label>
                  <input
                    type="text"
                    id="swift"
                    placeholder="SWIFT / BIC"
                    onChange={(e) => setSwiftCode(e.target.value)}
                    value={swiftCode}
                    className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>
            </>
          )}

          {/* Error text */}
          <p
            ref={errorRef}
            className={errMsg ? "errmsg text-xs text-red-500" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className={`px-4 py-2 rounded-xl text-sm font-medium border ${
                step === 1
                  ? "border-slate-200 text-slate-300 cursor-not-allowed"
                  : "border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              Back
            </button>

            {step < totalSteps && (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 rounded-xl text-white text-sm font-semibold bg-teal-600 hover:bg-teal-700 transition"
              >
                Next
              </button>
            )}

            {step === totalSteps && (
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-white text-sm font-semibold bg-teal-600 hover:bg-teal-700 transition"
              >
                Sign up
              </button>
            )}
          </div>

          {/* Already have account */}
          <p className="text-xs text-center text-slate-500 mt-2">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-teal-700 font-medium cursor-pointer hover:underline"
            >
              Log in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
