import styled from "styled-components";
import { useLanguageContext } from "@/context/LanguageContext";
import { InputWrapper } from "../Auth";
import React, { Key } from "react";
// @ts-ignore
import countryList from "react-select-country-list";
import { useAuthContext } from "@root/src/context/AuthContext";
import { Button } from "@components/Button";
import { validationForm } from "@root/src/utils/functions";
import { Confirmation } from "@components/Confirmation";

const Wrapper = styled.div`
  gap: 24px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  align-content: flex-start;
  @media screen and (max-width: 479px) {
    padding: 16px;
    margin-bottom: 32px;
  }
`;

const SelectInput = styled.select`
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border-radius: 4px;
  background: #ffffff0a;
  border: 1px solid #ffffff08;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.64);
  min-height: 40px;
  outline: none;
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
`;

export const PersonalInfo = () => {
  const { user, userDetails, updateUser } = useAuthContext();

  const { lan } = useLanguageContext();
  const [fName, setFName] = React.useState<string>("");
  const [lName, setLName] = React.useState<string>("");
  const [country, setCountry] = React.useState<string>("");

  // Validation states
  const [err, setErr] = React.useState<any>("");
  const [success, setSuccess] = React.useState<any>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  // placeholders
  const [pName, setPName] = React.useState<string>("");
  const [pLame, setPLame] = React.useState<string>("");
  const [pEmail, setPEmail] = React.useState<string>("");

  const handleSubmit = () => {
    setLoading(true);
    let validation = validationForm({
      fName: fName,
      lName: lName,
    });

    if (validation.err) {
      setLoading(false);
      setErr(validation);
    } else {
      let fullName = `${fName} ${lName}`;
      let data = {
        fullName: fullName.trim().length !== 0 ? fullName : `${pName} ${pLame}`,
        country,
        email: pEmail,
      };

      updateUser({
        collection: "users",
        id: user.uid,
        data,
      });
      setLoading(false);
      setSuccess(true);
      setErr("");
    }
  };

  React.useMemo(() => {
    if (userDetails) {
      setPName(userDetails?.fullName.split(" ")[0]);
      setPLame(userDetails?.fullName.split(" ")[1]);
      setPEmail(userDetails?.email);
    }
  }, [userDetails]);

  const options = React.useMemo(() => countryList().getData(), []);

  return (
    <Wrapper>
      {success && (
        <Confirmation
          handleClose={() => setSuccess(false)}
          title={successTitle[lan]}
          text={successText[lan]}
        />
      )}
      <div>
        <p className="text-xl sm:text-2xl">{headerText[lan]}</p>
      </div>
      <div className="flex flex-wrap sm:flex-nowrap gap-[32px]">
        <div className="w-full">
          <p className="mb-2 text-xs">{userInfoText[0][lan]}</p>
          <InputWrapper
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            placeholder={pName || userInfoText[0][lan]}
          />
        </div>
        <div className="w-full">
          <p className="mb-2 text-xs">{userInfoText[1][lan]}</p>
          <InputWrapper
            value={lName}
            onChange={(e) => setLName(e.target.value)}
            placeholder={pLame || userInfoText[1][lan]}
          />
        </div>
      </div>
      <div className="flex flex-wrap sm:flex-nowrap gap-[32px]">
        <div className="w-full">
          <p className="mb-2 text-xs">{userInfoText[2][lan]}</p>
          <InputWrapper
            value={pEmail}
            disabled
            placeholder={pEmail || userInfoText[2][lan]}
          />
        </div>
        <div className="w-full">
          <p className="mb-2 text-xs">{userInfoText[3][lan]}</p>
          <SelectInput
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            name="countries"
            id="countries-select"
          >
            <option value="">Select a country</option>
            {options.map((o: any, i: Key) => (
              <option value={o.label} key={i}>
                {o.label}
              </option>
            ))}
          </SelectInput>
        </div>
      </div>
      <div className="mt-auto mb-6 ml-auto relative">
        <Button
          loading={loading}
          disable={country === "" || fName === "" || lName === ""}
          action={handleSubmit}
          text={buttonText[lan]}
        />
        {err && (
          <p className="top-[-20px] absolute text-left text-xs text-[#F96E46]">
            {err.msg}
          </p>
        )}
      </div>
    </Wrapper>
  );
};

const headerText: any = {
  en: "Personal Information",
  fr: "Informations personnelles",
};
const buttonText: any = {
  en: "Save changes",
  fr: "Sauvegarder les modifications",
};
const userInfoText: any = [
  { en: "First name", fr: "Prénom" },
  { en: "Last name", fr: "Nom de famille" },
  { en: "Email address", fr: "Adresse e-mail" },
  { en: "Select Country", fr: "Choisissez un pays" },
];
const successTitle: any = {
  en: "Information updated",
  fr: "Informations mises à jour",
};
const successText: any = {
  en: "Your user details have been successfully updated",
  fr: "Vos informations d'utilisateur ont été mises à jour avec succès",
};
