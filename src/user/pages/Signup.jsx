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
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [nicImageUuid, setNicImageUuid] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [contactValid, setContactValid] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('LK');
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  // travellers: 3 steps, providers: 4 steps
  const totalSteps = userType === "SERVICE_PROVIDER" ? 4 : 3;

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

  const checkPasswordMatch = (pwd, confirmPwd) => {
    if (confirmPwd && pwd !== confirmPwd) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  const validatePassword = (pwd) => {
    const minLength = pwd.length >= 8;
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasLowercase = /[a-z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecial = /[!@#$%^&*]/.test(pwd);
    
    const isValid = minLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;
    setPasswordValid(isValid);
    return isValid;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setEmailValid(isValid);
    return isValid;
  };

  const countries = {
    'AD': { name: 'Andorra', code: '+376', pattern: /^[0-9]{6,8}$/, placeholder: '312345' },
    'AE': { name: 'United Arab Emirates', code: '+971', pattern: /^[0-9]{9}$/, placeholder: '501234567' },
    'AF': { name: 'Afghanistan', code: '+93', pattern: /^[0-9]{9}$/, placeholder: '701234567' },
    'AG': { name: 'Antigua and Barbuda', code: '+1268', pattern: /^[0-9]{7}$/, placeholder: '4641234' },
    'AI': { name: 'Anguilla', code: '+1264', pattern: /^[0-9]{7}$/, placeholder: '2351234' },
    'AL': { name: 'Albania', code: '+355', pattern: /^[0-9]{8,9}$/, placeholder: '67123456' },
    'AM': { name: 'Armenia', code: '+374', pattern: /^[0-9]{8}$/, placeholder: '77123456' },
    'AO': { name: 'Angola', code: '+244', pattern: /^[0-9]{9}$/, placeholder: '923123456' },
    'AQ': { name: 'Antarctica', code: '+672', pattern: /^[0-9]{6}$/, placeholder: '123456' },
    'AR': { name: 'Argentina', code: '+54', pattern: /^[0-9]{10,11}$/, placeholder: '1123456789' },
    'AS': { name: 'American Samoa', code: '+1684', pattern: /^[0-9]{7}$/, placeholder: '7331234' },
    'AT': { name: 'Austria', code: '+43', pattern: /^[0-9]{10,11}$/, placeholder: '6641234567' },
    'AU': { name: 'Australia', code: '+61', pattern: /^[0-9]{9}$/, placeholder: '412345678' },
    'AW': { name: 'Aruba', code: '+297', pattern: /^[0-9]{7}$/, placeholder: '5601234' },
    'AX': { name: 'Åland Islands', code: '+358', pattern: /^[0-9]{8,10}$/, placeholder: '41234567' },
    'AZ': { name: 'Azerbaijan', code: '+994', pattern: /^[0-9]{9}$/, placeholder: '401234567' },
    'BA': { name: 'Bosnia and Herzegovina', code: '+387', pattern: /^[0-9]{8}$/, placeholder: '61123456' },
    'BB': { name: 'Barbados', code: '+1246', pattern: /^[0-9]{7}$/, placeholder: '2501234' },
    'BD': { name: 'Bangladesh', code: '+880', pattern: /^[0-9]{10}$/, placeholder: '1712345678' },
    'BE': { name: 'Belgium', code: '+32', pattern: /^[0-9]{8,9}$/, placeholder: '471234567' },
    'BF': { name: 'Burkina Faso', code: '+226', pattern: /^[0-9]{8}$/, placeholder: '70123456' },
    'BG': { name: 'Bulgaria', code: '+359', pattern: /^[0-9]{8,9}$/, placeholder: '87123456' },
    'BH': { name: 'Bahrain', code: '+973', pattern: /^[0-9]{8}$/, placeholder: '36123456' },
    'BI': { name: 'Burundi', code: '+257', pattern: /^[0-9]{8}$/, placeholder: '79123456' },
    'BJ': { name: 'Benin', code: '+229', pattern: /^[0-9]{8}$/, placeholder: '90123456' },
    'BL': { name: 'Saint Barthélemy', code: '+590', pattern: /^[0-9]{9}$/, placeholder: '690123456' },
    'BM': { name: 'Bermuda', code: '+1441', pattern: /^[0-9]{7}$/, placeholder: '2951234' },
    'BN': { name: 'Brunei', code: '+673', pattern: /^[0-9]{7}$/, placeholder: '7123456' },
    'BO': { name: 'Bolivia', code: '+591', pattern: /^[0-9]{8}$/, placeholder: '71234567' },
    'BQ': { name: 'Caribbean Netherlands', code: '+599', pattern: /^[0-9]{7}$/, placeholder: '7181234' },
    'BR': { name: 'Brazil', code: '+55', pattern: /^[0-9]{10,11}$/, placeholder: '11987654321' },
    'BS': { name: 'Bahamas', code: '+1242', pattern: /^[0-9]{7}$/, placeholder: '3591234' },
    'BT': { name: 'Bhutan', code: '+975', pattern: /^[0-9]{8}$/, placeholder: '17123456' },
    'BV': { name: 'Bouvet Island', code: '+47', pattern: /^[0-9]{8}$/, placeholder: '40612345' },
    'BW': { name: 'Botswana', code: '+267', pattern: /^[0-9]{8}$/, placeholder: '71123456' },
    'BY': { name: 'Belarus', code: '+375', pattern: /^[0-9]{9}$/, placeholder: '291234567' },
    'BZ': { name: 'Belize', code: '+501', pattern: /^[0-9]{7}$/, placeholder: '6221234' },
    'CA': { name: 'Canada', code: '+1', pattern: /^[0-9]{10}$/, placeholder: '4161234567' },
    'CC': { name: 'Cocos Islands', code: '+61', pattern: /^[0-9]{9}$/, placeholder: '412345678' },
    'CD': { name: 'Democratic Republic of the Congo', code: '+243', pattern: /^[0-9]{9}$/, placeholder: '991234567' },
    'CF': { name: 'Central African Republic', code: '+236', pattern: /^[0-9]{8}$/, placeholder: '70123456' },
    'CG': { name: 'Republic of the Congo', code: '+242', pattern: /^[0-9]{9}$/, placeholder: '061234567' },
    'CH': { name: 'Switzerland', code: '+41', pattern: /^[0-9]{9}$/, placeholder: '791234567' },
    'CI': { name: 'Côte d\'Ivoire', code: '+225', pattern: /^[0-9]{8}$/, placeholder: '01234567' },
    'CK': { name: 'Cook Islands', code: '+682', pattern: /^[0-9]{5}$/, placeholder: '71234' },
    'CL': { name: 'Chile', code: '+56', pattern: /^[0-9]{9}$/, placeholder: '221234567' },
    'CM': { name: 'Cameroon', code: '+237', pattern: /^[0-9]{9}$/, placeholder: '671234567' },
    'CN': { name: 'China', code: '+86', pattern: /^[0-9]{11}$/, placeholder: '13812345678' },
    'CO': { name: 'Colombia', code: '+57', pattern: /^[0-9]{10}$/, placeholder: '3001234567' },
    'CR': { name: 'Costa Rica', code: '+506', pattern: /^[0-9]{8}$/, placeholder: '83123456' },
    'CU': { name: 'Cuba', code: '+53', pattern: /^[0-9]{8}$/, placeholder: '51234567' },
    'CV': { name: 'Cape Verde', code: '+238', pattern: /^[0-9]{7}$/, placeholder: '9911234' },
    'CW': { name: 'Curaçao', code: '+599', pattern: /^[0-9]{7}$/, placeholder: '9181234' },
    'CX': { name: 'Christmas Island', code: '+61', pattern: /^[0-9]{9}$/, placeholder: '412345678' },
    'CY': { name: 'Cyprus', code: '+357', pattern: /^[0-9]{8}$/, placeholder: '96123456' },
    'CZ': { name: 'Czech Republic', code: '+420', pattern: /^[0-9]{9}$/, placeholder: '601123456' },
    'DE': { name: 'Germany', code: '+49', pattern: /^[0-9]{10,11}$/, placeholder: '1512345678' },
    'DJ': { name: 'Djibouti', code: '+253', pattern: /^[0-9]{8}$/, placeholder: '77123456' },
    'DK': { name: 'Denmark', code: '+45', pattern: /^[0-9]{8}$/, placeholder: '20123456' },
    'DM': { name: 'Dominica', code: '+1767', pattern: /^[0-9]{7}$/, placeholder: '2251234' },
    'DO': { name: 'Dominican Republic', code: '+1', pattern: /^[0-9]{10}$/, placeholder: '8091234567' },
    'DZ': { name: 'Algeria', code: '+213', pattern: /^[0-9]{9}$/, placeholder: '551234567' },
    'EC': { name: 'Ecuador', code: '+593', pattern: /^[0-9]{9}$/, placeholder: '991234567' },
    'EE': { name: 'Estonia', code: '+372', pattern: /^[0-9]{7,8}$/, placeholder: '5123456' },
    'EG': { name: 'Egypt', code: '+20', pattern: /^[0-9]{10}$/, placeholder: '1001234567' },
    'EH': { name: 'Western Sahara', code: '+212', pattern: /^[0-9]{9}$/, placeholder: '650123456' },
    'ER': { name: 'Eritrea', code: '+291', pattern: /^[0-9]{7}$/, placeholder: '7123456' },
    'ES': { name: 'Spain', code: '+34', pattern: /^[0-9]{9}$/, placeholder: '612345678' },
    'ET': { name: 'Ethiopia', code: '+251', pattern: /^[0-9]{9}$/, placeholder: '911234567' },
    'FI': { name: 'Finland', code: '+358', pattern: /^[0-9]{8,10}$/, placeholder: '401234567' },
    'FJ': { name: 'Fiji', code: '+679', pattern: /^[0-9]{7}$/, placeholder: '7012345' },
    'FK': { name: 'Falkland Islands', code: '+500', pattern: /^[0-9]{5}$/, placeholder: '51234' },
    'FM': { name: 'Micronesia', code: '+691', pattern: /^[0-9]{7}$/, placeholder: '3501234' },
    'FO': { name: 'Faroe Islands', code: '+298', pattern: /^[0-9]{6}$/, placeholder: '211234' },
    'FR': { name: 'France', code: '+33', pattern: /^[0-9]{9}$/, placeholder: '612345678' },
    'GA': { name: 'Gabon', code: '+241', pattern: /^[0-9]{8}$/, placeholder: '06123456' },
    'GB': { name: 'United Kingdom', code: '+44', pattern: /^[0-9]{10,11}$/, placeholder: '7911123456' },
    'GD': { name: 'Grenada', code: '+1473', pattern: /^[0-9]{7}$/, placeholder: '4031234' },
    'GE': { name: 'Georgia', code: '+995', pattern: /^[0-9]{9}$/, placeholder: '555123456' },
    'GF': { name: 'French Guiana', code: '+594', pattern: /^[0-9]{9}$/, placeholder: '694123456' },
    'GG': { name: 'Guernsey', code: '+44', pattern: /^[0-9]{10}$/, placeholder: '7781123456' },
    'GH': { name: 'Ghana', code: '+233', pattern: /^[0-9]{9}$/, placeholder: '231234567' },
    'GI': { name: 'Gibraltar', code: '+350', pattern: /^[0-9]{8}$/, placeholder: '57123456' },
    'GL': { name: 'Greenland', code: '+299', pattern: /^[0-9]{6}$/, placeholder: '221234' },
    'GM': { name: 'Gambia', code: '+220', pattern: /^[0-9]{7}$/, placeholder: '3012345' },
    'GN': { name: 'Guinea', code: '+224', pattern: /^[0-9]{9}$/, placeholder: '601123456' },
    'GP': { name: 'Guadeloupe', code: '+590', pattern: /^[0-9]{9}$/, placeholder: '690123456' },
    'GQ': { name: 'Equatorial Guinea', code: '+240', pattern: /^[0-9]{9}$/, placeholder: '222123456' },
    'GR': { name: 'Greece', code: '+30', pattern: /^[0-9]{10}$/, placeholder: '6912345678' },
    'GS': { name: 'South Georgia', code: '+500', pattern: /^[0-9]{5}$/, placeholder: '51234' },
    'GT': { name: 'Guatemala', code: '+502', pattern: /^[0-9]{8}$/, placeholder: '51234567' },
    'GU': { name: 'Guam', code: '+1671', pattern: /^[0-9]{7}$/, placeholder: '3001234' },
    'GW': { name: 'Guinea-Bissau', code: '+245', pattern: /^[0-9]{7}$/, placeholder: '9551234' },
    'GY': { name: 'Guyana', code: '+592', pattern: /^[0-9]{7}$/, placeholder: '6091234' },
    'HK': { name: 'Hong Kong', code: '+852', pattern: /^[0-9]{8}$/, placeholder: '51234567' },
    'HM': { name: 'Heard Island', code: '+672', pattern: /^[0-9]{6}$/, placeholder: '123456' },
    'HN': { name: 'Honduras', code: '+504', pattern: /^[0-9]{8}$/, placeholder: '91234567' },
    'HR': { name: 'Croatia', code: '+385', pattern: /^[0-9]{8,9}$/, placeholder: '921234567' },
    'HT': { name: 'Haiti', code: '+509', pattern: /^[0-9]{8}$/, placeholder: '34123456' },
    'HU': { name: 'Hungary', code: '+36', pattern: /^[0-9]{9}$/, placeholder: '201234567' },
    'ID': { name: 'Indonesia', code: '+62', pattern: /^[0-9]{9,12}$/, placeholder: '812345678' },
    'IE': { name: 'Ireland', code: '+353', pattern: /^[0-9]{9}$/, placeholder: '851234567' },
    'IL': { name: 'Israel', code: '+972', pattern: /^[0-9]{9}$/, placeholder: '501234567' },
    'IM': { name: 'Isle of Man', code: '+44', pattern: /^[0-9]{10}$/, placeholder: '7924123456' },
    'IN': { name: 'India', code: '+91', pattern: /^[0-9]{10}$/, placeholder: '9876543210' },
    'IO': { name: 'British Indian Ocean Territory', code: '+246', pattern: /^[0-9]{7}$/, placeholder: '3801234' },
    'IQ': { name: 'Iraq', code: '+964', pattern: /^[0-9]{10}$/, placeholder: '7901234567' },
    'IR': { name: 'Iran', code: '+98', pattern: /^[0-9]{10}$/, placeholder: '9123456789' },
    'IS': { name: 'Iceland', code: '+354', pattern: /^[0-9]{7}$/, placeholder: '6111234' },
    'IT': { name: 'Italy', code: '+39', pattern: /^[0-9]{9,10}$/, placeholder: '3123456789' },
    'JE': { name: 'Jersey', code: '+44', pattern: /^[0-9]{10}$/, placeholder: '7797123456' },
    'JM': { name: 'Jamaica', code: '+1876', pattern: /^[0-9]{7}$/, placeholder: '2101234' },
    'JO': { name: 'Jordan', code: '+962', pattern: /^[0-9]{9}$/, placeholder: '790123456' },
    'JP': { name: 'Japan', code: '+81', pattern: /^[0-9]{10,11}$/, placeholder: '9012345678' },
    'KE': { name: 'Kenya', code: '+254', pattern: /^[0-9]{9}$/, placeholder: '712345678' },
    'KG': { name: 'Kyrgyzstan', code: '+996', pattern: /^[0-9]{9}$/, placeholder: '700123456' },
    'KH': { name: 'Cambodia', code: '+855', pattern: /^[0-9]{8,9}$/, placeholder: '91234567' },
    'KI': { name: 'Kiribati', code: '+686', pattern: /^[0-9]{5}$/, placeholder: '72001' },
    'KM': { name: 'Comoros', code: '+269', pattern: /^[0-9]{7}$/, placeholder: '3212345' },
    'KN': { name: 'Saint Kitts and Nevis', code: '+1869', pattern: /^[0-9]{7}$/, placeholder: '7651234' },
    'KP': { name: 'North Korea', code: '+850', pattern: /^[0-9]{8}$/, placeholder: '19123456' },
    'KR': { name: 'South Korea', code: '+82', pattern: /^[0-9]{10,11}$/, placeholder: '1012345678' },
    'KW': { name: 'Kuwait', code: '+965', pattern: /^[0-9]{8}$/, placeholder: '50012345' },
    'KY': { name: 'Cayman Islands', code: '+1345', pattern: /^[0-9]{7}$/, placeholder: '3231234' },
    'KZ': { name: 'Kazakhstan', code: '+7', pattern: /^[0-9]{10}$/, placeholder: '7710009998' },
    'LA': { name: 'Laos', code: '+856', pattern: /^[0-9]{8}$/, placeholder: '20123456' },
    'LB': { name: 'Lebanon', code: '+961', pattern: /^[0-9]{7,8}$/, placeholder: '71123456' },
    'LC': { name: 'Saint Lucia', code: '+1758', pattern: /^[0-9]{7}$/, placeholder: '2841234' },
    'LI': { name: 'Liechtenstein', code: '+423', pattern: /^[0-9]{7}$/, placeholder: '6611234' },
    'LK': { name: 'Sri Lanka', code: '+94', pattern: /^[0-9]{9}$/, placeholder: '771234567' },
    'LR': { name: 'Liberia', code: '+231', pattern: /^[0-9]{7,8}$/, placeholder: '77012345' },
    'LS': { name: 'Lesotho', code: '+266', pattern: /^[0-9]{8}$/, placeholder: '50123456' },
    'LT': { name: 'Lithuania', code: '+370', pattern: /^[0-9]{8}$/, placeholder: '61234567' },
    'LU': { name: 'Luxembourg', code: '+352', pattern: /^[0-9]{9}$/, placeholder: '628123456' },
    'LV': { name: 'Latvia', code: '+371', pattern: /^[0-9]{8}$/, placeholder: '21234567' },
    'LY': { name: 'Libya', code: '+218', pattern: /^[0-9]{9}$/, placeholder: '912345678' },
    'MA': { name: 'Morocco', code: '+212', pattern: /^[0-9]{9}$/, placeholder: '650123456' },
    'MC': { name: 'Monaco', code: '+377', pattern: /^[0-9]{8}$/, placeholder: '61123456' },
    'MD': { name: 'Moldova', code: '+373', pattern: /^[0-9]{8}$/, placeholder: '60123456' },
    'ME': { name: 'Montenegro', code: '+382', pattern: /^[0-9]{8}$/, placeholder: '67123456' },
    'MF': { name: 'Saint Martin', code: '+590', pattern: /^[0-9]{9}$/, placeholder: '690123456' },
    'MG': { name: 'Madagascar', code: '+261', pattern: /^[0-9]{9}$/, placeholder: '321234567' },
    'MH': { name: 'Marshall Islands', code: '+692', pattern: /^[0-9]{7}$/, placeholder: '2351234' },
    'MK': { name: 'North Macedonia', code: '+389', pattern: /^[0-9]{8}$/, placeholder: '70123456' },
    'ML': { name: 'Mali', code: '+223', pattern: /^[0-9]{8}$/, placeholder: '65012345' },
    'MM': { name: 'Myanmar', code: '+95', pattern: /^[0-9]{8,10}$/, placeholder: '9212345678' },
    'MN': { name: 'Mongolia', code: '+976', pattern: /^[0-9]{8}$/, placeholder: '88123456' },
    'MO': { name: 'Macao', code: '+853', pattern: /^[0-9]{8}$/, placeholder: '66123456' },
    'MP': { name: 'Northern Mariana Islands', code: '+1670', pattern: /^[0-9]{7}$/, placeholder: '2341234' },
    'MQ': { name: 'Martinique', code: '+596', pattern: /^[0-9]{9}$/, placeholder: '696123456' },
    'MR': { name: 'Mauritania', code: '+222', pattern: /^[0-9]{8}$/, placeholder: '22123456' },
    'MS': { name: 'Montserrat', code: '+1664', pattern: /^[0-9]{7}$/, placeholder: '4921234' },
    'MT': { name: 'Malta', code: '+356', pattern: /^[0-9]{8}$/, placeholder: '99123456' },
    'MU': { name: 'Mauritius', code: '+230', pattern: /^[0-9]{8}$/, placeholder: '52512345' },
    'MV': { name: 'Maldives', code: '+960', pattern: /^[0-9]{7}$/, placeholder: '7712345' },
    'MW': { name: 'Malawi', code: '+265', pattern: /^[0-9]{7,9}$/, placeholder: '991234567' },
    'MX': { name: 'Mexico', code: '+52', pattern: /^[0-9]{10}$/, placeholder: '5512345678' },
    'MY': { name: 'Malaysia', code: '+60', pattern: /^[0-9]{9,10}$/, placeholder: '123456789' },
    'MZ': { name: 'Mozambique', code: '+258', pattern: /^[0-9]{9}$/, placeholder: '821234567' },
    'NA': { name: 'Namibia', code: '+264', pattern: /^[0-9]{8}$/, placeholder: '81123456' },
    'NC': { name: 'New Caledonia', code: '+687', pattern: /^[0-9]{6}$/, placeholder: '751234' },
    'NE': { name: 'Niger', code: '+227', pattern: /^[0-9]{8}$/, placeholder: '20123456' },
    'NF': { name: 'Norfolk Island', code: '+672', pattern: /^[0-9]{6}$/, placeholder: '381234' },
    'NG': { name: 'Nigeria', code: '+234', pattern: /^[0-9]{10}$/, placeholder: '8012345678' },
    'NI': { name: 'Nicaragua', code: '+505', pattern: /^[0-9]{8}$/, placeholder: '81234567' },
    'NL': { name: 'Netherlands', code: '+31', pattern: /^[0-9]{9}$/, placeholder: '612345678' },
    'NO': { name: 'Norway', code: '+47', pattern: /^[0-9]{8}$/, placeholder: '40612345' },
    'NP': { name: 'Nepal', code: '+977', pattern: /^[0-9]{10}$/, placeholder: '9841234567' },
    'NR': { name: 'Nauru', code: '+674', pattern: /^[0-9]{7}$/, placeholder: '5551234' },
    'NU': { name: 'Niue', code: '+683', pattern: /^[0-9]{4}$/, placeholder: '1234' },
    'NZ': { name: 'New Zealand', code: '+64', pattern: /^[0-9]{8,9}$/, placeholder: '211234567' },
    'OM': { name: 'Oman', code: '+968', pattern: /^[0-9]{8}$/, placeholder: '92123456' },
    'PA': { name: 'Panama', code: '+507', pattern: /^[0-9]{8}$/, placeholder: '61234567' },
    'PE': { name: 'Peru', code: '+51', pattern: /^[0-9]{9}$/, placeholder: '987654321' },
    'PF': { name: 'French Polynesia', code: '+689', pattern: /^[0-9]{8}$/, placeholder: '87123456' },
    'PG': { name: 'Papua New Guinea', code: '+675', pattern: /^[0-9]{8}$/, placeholder: '70123456' },
    'PH': { name: 'Philippines', code: '+63', pattern: /^[0-9]{10}$/, placeholder: '9171234567' },
    'PK': { name: 'Pakistan', code: '+92', pattern: /^[0-9]{10}$/, placeholder: '3001234567' },
    'PL': { name: 'Poland', code: '+48', pattern: /^[0-9]{9}$/, placeholder: '501234567' },
    'PM': { name: 'Saint Pierre and Miquelon', code: '+508', pattern: /^[0-9]{6}$/, placeholder: '551234' },
    'PN': { name: 'Pitcairn Islands', code: '+64', pattern: /^[0-9]{8}$/, placeholder: '21123456' },
    'PR': { name: 'Puerto Rico', code: '+1', pattern: /^[0-9]{10}$/, placeholder: '7871234567' },
    'PS': { name: 'Palestine', code: '+970', pattern: /^[0-9]{9}$/, placeholder: '599123456' },
    'PT': { name: 'Portugal', code: '+351', pattern: /^[0-9]{9}$/, placeholder: '912345678' },
    'PW': { name: 'Palau', code: '+680', pattern: /^[0-9]{7}$/, placeholder: '6201234' },
    'PY': { name: 'Paraguay', code: '+595', pattern: /^[0-9]{9}$/, placeholder: '961123456' },
    'QA': { name: 'Qatar', code: '+974', pattern: /^[0-9]{8}$/, placeholder: '33123456' },
    'RE': { name: 'Réunion', code: '+262', pattern: /^[0-9]{9}$/, placeholder: '692123456' },
    'RO': { name: 'Romania', code: '+40', pattern: /^[0-9]{9}$/, placeholder: '712345678' },
    'RS': { name: 'Serbia', code: '+381', pattern: /^[0-9]{8,9}$/, placeholder: '601234567' },
    'RU': { name: 'Russia', code: '+7', pattern: /^[0-9]{10}$/, placeholder: '9123456789' },
    'RW': { name: 'Rwanda', code: '+250', pattern: /^[0-9]{9}$/, placeholder: '781234567' },
    'SA': { name: 'Saudi Arabia', code: '+966', pattern: /^[0-9]{9}$/, placeholder: '501234567' },
    'SB': { name: 'Solomon Islands', code: '+677', pattern: /^[0-9]{7}$/, placeholder: '7421234' },
    'SC': { name: 'Seychelles', code: '+248', pattern: /^[0-9]{7}$/, placeholder: '2510123' },
    'SD': { name: 'Sudan', code: '+249', pattern: /^[0-9]{9}$/, placeholder: '912345678' },
    'SE': { name: 'Sweden', code: '+46', pattern: /^[0-9]{9}$/, placeholder: '701234567' },
    'SG': { name: 'Singapore', code: '+65', pattern: /^[0-9]{8}$/, placeholder: '81234567' },
    'SH': { name: 'Saint Helena', code: '+290', pattern: /^[0-9]{4}$/, placeholder: '1234' },
    'SI': { name: 'Slovenia', code: '+386', pattern: /^[0-9]{8}$/, placeholder: '31123456' },
    'SJ': { name: 'Svalbard and Jan Mayen', code: '+47', pattern: /^[0-9]{8}$/, placeholder: '79123456' },
    'SK': { name: 'Slovakia', code: '+421', pattern: /^[0-9]{9}$/, placeholder: '912123456' },
    'SL': { name: 'Sierra Leone', code: '+232', pattern: /^[0-9]{8}$/, placeholder: '25123456' },
    'SM': { name: 'San Marino', code: '+378', pattern: /^[0-9]{10}$/, placeholder: '6612345678' },
    'SN': { name: 'Senegal', code: '+221', pattern: /^[0-9]{9}$/, placeholder: '701234567' },
    'SO': { name: 'Somalia', code: '+252', pattern: /^[0-9]{8}$/, placeholder: '90123456' },
    'SR': { name: 'Suriname', code: '+597', pattern: /^[0-9]{7}$/, placeholder: '7412345' },
    'SS': { name: 'South Sudan', code: '+211', pattern: /^[0-9]{9}$/, placeholder: '977123456' },
    'ST': { name: 'São Tomé and Príncipe', code: '+239', pattern: /^[0-9]{7}$/, placeholder: '9812345' },
    'SV': { name: 'El Salvador', code: '+503', pattern: /^[0-9]{8}$/, placeholder: '70123456' },
    'SX': { name: 'Sint Maarten', code: '+1721', pattern: /^[0-9]{7}$/, placeholder: '5201234' },
    'SY': { name: 'Syria', code: '+963', pattern: /^[0-9]{9}$/, placeholder: '944567890' },
    'SZ': { name: 'Eswatini', code: '+268', pattern: /^[0-9]{8}$/, placeholder: '76123456' },
    'TC': { name: 'Turks and Caicos Islands', code: '+1649', pattern: /^[0-9]{7}$/, placeholder: '2311234' },
    'TD': { name: 'Chad', code: '+235', pattern: /^[0-9]{8}$/, placeholder: '63012345' },
    'TF': { name: 'French Southern Territories', code: '+262', pattern: /^[0-9]{9}$/, placeholder: '692123456' },
    'TG': { name: 'Togo', code: '+228', pattern: /^[0-9]{8}$/, placeholder: '90123456' },
    'TH': { name: 'Thailand', code: '+66', pattern: /^[0-9]{9}$/, placeholder: '812345678' },
    'TJ': { name: 'Tajikistan', code: '+992', pattern: /^[0-9]{9}$/, placeholder: '901123456' },
    'TK': { name: 'Tokelau', code: '+690', pattern: /^[0-9]{4}$/, placeholder: '7290' },
    'TL': { name: 'Timor-Leste', code: '+670', pattern: /^[0-9]{8}$/, placeholder: '77212345' },
    'TM': { name: 'Turkmenistan', code: '+993', pattern: /^[0-9]{8}$/, placeholder: '65123456' },
    'TN': { name: 'Tunisia', code: '+216', pattern: /^[0-9]{8}$/, placeholder: '20123456' },
    'TO': { name: 'Tonga', code: '+676', pattern: /^[0-9]{7}$/, placeholder: '7715123' },
    'TR': { name: 'Turkey', code: '+90', pattern: /^[0-9]{10}$/, placeholder: '5321234567' },
    'TT': { name: 'Trinidad and Tobago', code: '+1868', pattern: /^[0-9]{7}$/, placeholder: '2911234' },
    'TV': { name: 'Tuvalu', code: '+688', pattern: /^[0-9]{5}$/, placeholder: '90123' },
    'TW': { name: 'Taiwan', code: '+886', pattern: /^[0-9]{9}$/, placeholder: '912345678' },
    'TZ': { name: 'Tanzania', code: '+255', pattern: /^[0-9]{9}$/, placeholder: '621234567' },
    'UA': { name: 'Ukraine', code: '+380', pattern: /^[0-9]{9}$/, placeholder: '501234567' },
    'UG': { name: 'Uganda', code: '+256', pattern: /^[0-9]{9}$/, placeholder: '712345678' },
    'UM': { name: 'United States Minor Outlying Islands', code: '+1', pattern: /^[0-9]{10}$/, placeholder: '2025551234' },
    'US': { name: 'United States', code: '+1', pattern: /^[0-9]{10}$/, placeholder: '2025551234' },
    'UY': { name: 'Uruguay', code: '+598', pattern: /^[0-9]{8}$/, placeholder: '94231234' },
    'UZ': { name: 'Uzbekistan', code: '+998', pattern: /^[0-9]{9}$/, placeholder: '901234567' },
    'VA': { name: 'Vatican City', code: '+39', pattern: /^[0-9]{9,10}$/, placeholder: '3123456789' },
    'VC': { name: 'Saint Vincent and the Grenadines', code: '+1784', pattern: /^[0-9]{7}$/, placeholder: '4301234' },
    'VE': { name: 'Venezuela', code: '+58', pattern: /^[0-9]{10}$/, placeholder: '4121234567' },
    'VG': { name: 'British Virgin Islands', code: '+1284', pattern: /^[0-9]{7}$/, placeholder: '3001234' },
    'VI': { name: 'United States Virgin Islands', code: '+1340', pattern: /^[0-9]{7}$/, placeholder: '6931234' },
    'VN': { name: 'Vietnam', code: '+84', pattern: /^[0-9]{9,10}$/, placeholder: '912345678' },
    'VU': { name: 'Vanuatu', code: '+678', pattern: /^[0-9]{7}$/, placeholder: '5912345' },
    'WF': { name: 'Wallis and Futuna', code: '+681', pattern: /^[0-9]{6}$/, placeholder: '501234' },
    'WS': { name: 'Samoa', code: '+685', pattern: /^[0-9]{7}$/, placeholder: '7212345' },
    'YE': { name: 'Yemen', code: '+967', pattern: /^[0-9]{9}$/, placeholder: '712345678' },
    'YT': { name: 'Mayotte', code: '+262', pattern: /^[0-9]{9}$/, placeholder: '639123456' },
    'ZA': { name: 'South Africa', code: '+27', pattern: /^[0-9]{9}$/, placeholder: '821234567' },
    'ZM': { name: 'Zambia', code: '+260', pattern: /^[0-9]{9}$/, placeholder: '955123456' },
    'ZW': { name: 'Zimbabwe', code: '+263', pattern: /^[0-9]{9}$/, placeholder: '712345678' }
  };

  const validateContact = (contact) => {
    const country = countries[selectedCountry];
    const cleanNumber = contact.replace(/\s/g, '');
    const isValid = country.pattern.test(cleanNumber);
    setContactValid(isValid);
    return isValid;
  };

  const countryAliases = {
    'US': ['america', 'usa', 'united states'],
    'GB': ['england', 'britain', 'uk'],
    'KR': ['korea', 'south korea'],
    'KP': ['north korea'],
    'RU': ['russia'],
    'CN': ['china'],
    'IN': ['india'],
    'DE': ['germany'],
    'FR': ['france'],
    'IT': ['italy'],
    'ES': ['spain'],
    'NL': ['holland'],
    'CH': ['switzerland'],
    'AE': ['uae', 'emirates'],
    'SA': ['saudi'],
    'EG': ['egypt'],
    'ZA': ['south africa'],
    'AU': ['australia'],
    'NZ': ['new zealand'],
    'CA': ['canada'],
    'MX': ['mexico'],
    'BR': ['brazil'],
    'AR': ['argentina'],
    'JP': ['japan'],
    'TH': ['thailand'],
    'VN': ['vietnam'],
    'PH': ['philippines'],
    'ID': ['indonesia'],
    'MY': ['malaysia'],
    'SG': ['singapore'],
    'LK': ['sri lanka', 'ceylon']
  };

  const filteredCountries = Object.entries(countries)
    .filter(([code, country]) => {
      const searchTerm = countrySearch.toLowerCase();
      const nameMatch = country.name.toLowerCase().includes(searchTerm);
      const aliasMatch = countryAliases[code]?.some(alias => 
        alias.toLowerCase().includes(searchTerm)
      );
      return nameMatch || aliasMatch;
    })
    .sort(([, a], [, b]) => a.name.localeCompare(b.name));

  const handleFileUpload = async (file) => {
    if (!file) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await axios.post('storage/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data)
      setNicImageUuid(response.data);
      Swal.fire({
        icon: 'success',
        title: 'File uploaded successfully!',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Upload failed',
        text: 'Failed to upload file. Please try again.',
        confirmButtonColor: '#0f766e'
      });
    } finally {
      setUploading(false);
    }
  };

  const validateStep = () => {
    // STEP 1: type + account + profile
    if (step === 1) {
      if (!name || !email || !password || !confirmPwd || !gender || !dob) {
        showError("Incomplete details", "Please fill all required fields.");
        return false;
      }
      if (password !== confirmPwd) {
        showError("Password mismatch", "Passwords do not match.");
        return false;
      }
      if (!validatePassword(password)) {
        showError("Invalid password", "Password does not meet requirements.");
        return false;
      }
      if (!validateEmail(email)) {
        showError("Invalid email", "Please enter a valid email address.");
        return false;
      }
    }

    // STEP 2: contact + address (both types)
    if (step === 2) {
      if (!contactNumber || !addressLine1 || !city || !state || !postalCode) {
        showError("Address required", "Please fill all address fields.");
        return false;
      }
      if (userType === "SERVICE_PROVIDER" && !googleMapsUrl) {
        showError("Google Maps Link required", "Please provide a Google Maps location link.");
        return false;
      }
      if (!validateContact(contactNumber)) {
        showError("Invalid contact", "Please enter a valid phone number.");
        return false;
      }
    }

    // STEP 3: NIC verification (both types)
    if (step === 3) {
      if (!idNumber) {
        showError(
          "Verification required",
          "Please provide your NIC/Passport number."
        );
        return false;
      }
    }

    // STEP 4: bank (only for provider)
    if (step === 4 && userType === "SERVICE_PROVIDER") {
      if (!bankName || !accountName || !accountNumber || !branch) {
        showError(
          "Bank details required",
          "Please fill all bank details."
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
      const payload = {
        type: userType,
        name,
        gender,
        contactNumber,
        email,
        password,
        dateOfBirth: dob,
        nicNumber: idNumber,
        uniqIdentifier: email,
        nicImageUuid: nicImageUuid,
        address: {
          street1: addressLine1,
          street2: addressLine2,
          city,
          state,
          postalCode
        },
        country: selectedCountry,
        googleMapsUrl: googleMapsUrl,
        bankDetails: {
          accountNumber,
          holderName: accountName,
          bank: bankName,
          branch
        }
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
                  value={email}
                  required
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 ${
                    !emailValid && email
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-teal-600 focus:ring-teal-100"
                  }`}
                />
                {!emailValid && email && (
                  <p className="text-xs text-red-500 mt-1">Please enter a valid email address</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validatePassword(e.target.value);
                      checkPasswordMatch(e.target.value, confirmPwd);
                    }}
                    value={password}
                    required
                    className={`w-full rounded-xl border px-3 py-2.5 pr-10 text-sm outline-none focus:ring-2 ${
                      !passwordValid && password
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-teal-600 focus:ring-teal-100"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L8.464 8.464m5.656 5.656l1.415 1.415m-1.415-1.415l1.415 1.415M14.828 14.828L16.243 16.243" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {!passwordValid && password && (
                  <div className="text-xs text-red-500 mt-1 space-y-1">
                    <p>Password must contain:</p>
                    <ul className="list-disc list-inside ml-2 space-y-0.5">
                      <li className={password.length >= 8 ? "text-green-600" : ""}>At least 8 characters</li>
                      <li className={/[A-Z]/.test(password) ? "text-green-600" : ""}>One uppercase letter</li>
                      <li className={/[a-z]/.test(password) ? "text-green-600" : ""}>One lowercase letter</li>
                      <li className={/\d/.test(password) ? "text-green-600" : ""}>One number</li>
                      <li className={/[!@#$%^&*]/.test(password) ? "text-green-600" : ""}>One special character (!@#$%^&*)</li>
                    </ul>
                  </div>
                )}
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
                  onChange={(e) => {
                    setConfirmPwd(e.target.value);
                    checkPasswordMatch(password, e.target.value);
                  }}
                  value={confirmPwd}
                  required
                  className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 ${
                    !passwordMatch && confirmPwd
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-teal-600 focus:ring-teal-100"
                  }`}
                />
                {!passwordMatch && confirmPwd && (
                  <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                )}
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
                <div className="flex gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Type country name..."
                      value={showCountryDropdown ? countrySearch : countries[selectedCountry].name}
                      onChange={(e) => {
                        setCountrySearch(e.target.value);
                        setShowCountryDropdown(true);
                      }}
                      onFocus={() => {
                        setCountrySearch('');
                        setShowCountryDropdown(true);
                      }}
                      className="w-48 rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    />
                    {showCountryDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map(([code, country]) => (
                            <div
                              key={code}
                              onClick={() => {
                                setSelectedCountry(code);
                                setCountrySearch('');
                                setShowCountryDropdown(false);
                                if (contactNumber) validateContact(contactNumber);
                              }}
                              className="px-3 py-2 hover:bg-slate-50 cursor-pointer text-sm flex justify-between"
                            >
                              <span>{country.name}</span>
                              <span className="text-slate-400">{country.code}</span>
                            </div>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-sm text-slate-400">
                            No countries found
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <input
                    type="tel"
                    id="contact"
                    placeholder={countries[selectedCountry].placeholder}
                    autoComplete="off"
                    onChange={(e) => {
                      setContactNumber(e.target.value);
                      validateContact(e.target.value);
                    }}
                    onFocus={() => setShowCountryDropdown(false)}
                    value={contactNumber}
                    required
                    className={`flex-1 rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 ${
                      !contactValid && contactNumber
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-teal-600 focus:ring-teal-100"
                    }`}
                  />
                </div>
                {!contactValid && contactNumber && (
                  <p className="text-xs text-red-500 mt-1">
                    Please enter a valid {countries[selectedCountry].name} phone number
                  </p>
                )}
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
                  Google Maps Location Link {userType === "SERVICE_PROVIDER" && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="url"
                  id="googleMapsUrl"
                  placeholder="https://maps.google.com/..."
                  onChange={(e) => setGoogleMapsUrl(e.target.value)}
                  value={googleMapsUrl}
                  required={userType === "SERVICE_PROVIDER"}
                  className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>
            </>
          )}

          {/* STEP 3: NIC Verification (both types) */}
          {step === 3 && (
            <>
              <div className="mt-2 mb-1">
                <p className="text-sm font-semibold text-slate-800">
                  {userType === "SERVICE_PROVIDER" ? "Identity / Business Verification" : "Identity Verification"}
                </p>
                <p className="text-xs text-slate-500">
                  {userType === "SERVICE_PROVIDER" 
                    ? "Add your NIC, passport, or business registration number and upload a clear photo or scan of the document."
                    : "Add your NIC or passport number and upload a clear photo or scan of the document for verification."
                  }
                </p>
              </div>

              {/* NIC / BR Number */}
              <div className="space-y-1">
                <label
                  htmlFor="idNumber"
                  className="block text-sm font-medium text-slate-700"
                >
                  {userType === "SERVICE_PROVIDER" ? "NIC / Passport / BR Number" : "NIC / Passport Number"}
                </label>
                <input
                  type="text"
                  id="idNumber"
                  placeholder={userType === "SERVICE_PROVIDER" ? "e.g. 991234567V / N1234567 / BR-2024-00123" : "e.g. 991234567V / N1234567"}
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
                  {userType === "SERVICE_PROVIDER" ? "NIC / Passport / BR Image" : "NIC / Passport Image"}
                </label>
                <input
                  type="file"
                  id="idDocumentFile"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setIdDocumentFile(file);
                    if (file) {
                      handleFileUpload(file);
                    }
                  }}
                  disabled={uploading}
                  className="w-full text-sm text-slate-600 file:mr-4 file:py-2.5 file:px-4 
                             file:rounded-xl file:border-0 file:text-sm file:font-semibold
                             file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100
                             disabled:opacity-50"
                />
                {uploading && (
                  <p className="text-xs text-blue-600 mt-1">Uploading...</p>
                )}
                {nicImageUuid && (
                  <p className="text-xs text-green-600 mt-1">✓ File uploaded successfully</p>
                )}
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
