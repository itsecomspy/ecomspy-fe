import React, { FormEvent } from "react";
import styled from "styled-components";
import { PiCloudArrowDown, PiInfo, PiXCircle } from "react-icons/pi";
import { Layout } from "../components/layout/Layout";
import { useLanguageContext } from "../context/LanguageContext";
import { useAuthContext } from "../context/AuthContext";
import { Button, Confirmation } from "@components/index";
import { formSubmit } from "../utils/functions";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
import fileImg from "@assets/images/filetype.png";

const IconWrapper = styled.div`
  background: linear-gradient(
    148.7deg,
    rgba(255, 255, 255, 0.16) 11.23%,
    rgba(255, 255, 255, 0) 109.72%
  );
  min-width: 32px;
  width: 32px;
  min-height: 32px;
  height: 32px;
  gap: 8px;
  display: flex;
  border-radius: 100px;
  opacity: 0px;
  border: 1px solid #ffffff0f;
`;

export const InputWrapper = styled.textarea<{
  $error?: boolean;
}>`
  width: calc(100% - 2px);
  margin: 1px;
  padding: 12px;
  border-radius: 4px;
  background: #ffffff0a;
  border: 1px solid #ffffff08;
  font-size: 15px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.64);
  min-height: 103px;
  max-height: 206px;
  outline: ${(props) => (props.$error ? "1px solid #f96e4687" : "none")};
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
`;

const UploadWrapper = styled.div`
  display: flex;
  max-height: 131px;
  height: 100%;
  padding: 64px;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  border: 1px dashed rgba(255, 255, 255, 0.03);
  background: rgba(255, 255, 255, 0.04);
  cursor: pointer;
`;

export const Feedback = () => {
  const { lan } = useLanguageContext();
  const { user } = useAuthContext();

  const [file, setFile] = React.useState<any>({});
  const [message, setMessage] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);

  // Handle Filedrop

  const onDrop = React.useCallback((acceptedFiles: any[]) => {
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".png"],
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (message.length < 10) {
      return setError(shortError[lan]);
    }

    const formData = {
      email: user?.email,
      name: user?.displayName,
      message,
      file,
    };

    formSubmit({ formData, formName: "feedback" })
      .then(() => {
        setOpen(true);
        setError("");
        setFile("");
        setMessage("");
      })
      .catch(() => {
        setError(submitError[lan]);
      });
  };

  React.useEffect(() => {
    setError("");
  }, [message]);

  return (
    <Layout>
      {open && (
        <Confirmation
          handleClose={() => setOpen(false)}
          text={confirmationText[lan]}
          title={confirmationTitle[lan]}
        />
      )}
      <div className="mb-20 sm:mb-0 p-4 sm:p-0 gap-6 flex flex-col w-full h-full overflow-scroll">
        <div>
          <p className="text-2xl">{titleText[lan]}</p>
          <p className="text-sm text-[#FFFFFF52] mb-6">{subtitleText[lan]}</p>
        </div>
        <div className=" max-w-[618px] w-full mx-auto flex flex-col gap-6">
          <div className="border-[0.5px] rounded border-[#FFFFFF1F] p-6 gap-3 flex justify-between items-start">
            <IconWrapper>
              <PiInfo className="m-auto" fontSize={16} />
            </IconWrapper>
            <div className="w-full">
              <p className="text-[15px] mb-1">{disclaimerText[lan]}</p>
              <p className="text-[#FFFFFF66] text-xs">
                {feedbackText[lan]}{" "}
                <Link
                  to="/settings"
                  state={{ tab: "support" }}
                  className="underline text-white"
                >
                  {linkText[lan]}
                </Link>
              </p>
            </div>
          </div>
          <form
            className="relative mb-20 flex flex-col gap-6"
            name="feedback"
            method="post"
            data-netlify="true"
          >
            <div className="relative">
              <input type="hidden" name="form-name" value="feedback" />
              <p className="mb-2 font-light text-sm">Message</p>
              <InputWrapper
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                maxLength={1000}
                value={message}
                placeholder={typeText[lan]}
                $error={error.length > 0}
              />
              <p className="ml-auto w-max text-sm">{message.length}/1000</p>
              {error && (
                <p className="bottom-[5px] w-screen absolute text-left text-xs text-[#F96E46]">
                  {error}
                </p>
              )}
            </div>

            <div {...getRootProps()}>
              <input hidden {...getInputProps()} />
              <p className="font-light text-sm mb-3">
                <span>{attachmentText[lan]}</span>{" "}
                <span className="text-[#FFFFFF66]">{optionalText[lan]}</span>
              </p>
              <UploadWrapper>
                <IconWrapper>
                  <PiCloudArrowDown className="m-auto" fontSize={16} />
                </IconWrapper>
                <p className="text-[14px]">{filesText[lan]}</p>
                <p className="text-[12px] text-[#FFFFFF66]">Max. 5MB</p>
              </UploadWrapper>
            </div>
            {Object.keys(file).length !== 0 && (
              <div className="flex w-full absolute bottom-[-64px]">
                <div className="flex items-center gap-3 cursor-pointer">
                  <img src={fileImg} width={40} />
                  <p className="flex flex-col">
                    <span className="text-[13px]">{file.name}</span>
                    <span className="text-xs text-[#FFFFFF66]">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </p>
                </div>
                <div
                  onClick={() => setFile({})}
                  className="cursor-pointer ml-auto"
                >
                  <PiXCircle className="ml-auto text-[#80898E]" fontSize={20} />
                  <p className="text-[13px] text-[#FFFFFF66] font-medium">
                    {uploadedText[lan]}
                  </p>
                </div>
              </div>
            )}
          </form>
          <Button
            size="large"
            action={(e) => handleSubmit(e)}
            text={buttonText[lan]}
          />
        </div>
      </div>
    </Layout>
  );
};

const titleText: { [key: string]: string } = {
  en: "Leave Feedback",
  fr: "Laisser les commentaires",
};
const subtitleText: { [key: string]: string } = {
  en: "We'd love to hear your feedback or how we can improve EcomSpy",
  fr: "Nous aimerions connaître vos commentaires ou savoir comment nous pouvons améliorer EcomSpy",
};
const disclaimerText: { [key: string]: string } = {
  en: "Disclaimer",
  fr: "Clause de non-responsabilité",
};
const feedbackText: { [key: string]: string } = {
  en: "Feedback only. We won't respond to requests here. For issues or support, please",
  fr: "Commentaires uniquement. Nous ne répondrons pas aux demandes ici. Pour des problèmes ou de l'assistance, veuillez",
};
const linkText: { [key: string]: string } = {
  en: "click here",
  fr: "cliquez ici",
};
const typeText: any = {
  en: "Type here...",
  fr: "Écrivez ici...",
};
const attachmentText: any = {
  en: "Attachment",
  fr: "Pièce jointe",
};
const optionalText: any = {
  en: "(optional)",
  fr: "(facultative)",
};
const filesText: any = {
  en: "Browse your files",
  fr: "Parcourez vos fichiers",
};
const buttonText: any = {
  en: "Submit",
  fr: "Soumettre",
};
const shortError: any = {
  en: "Message description is too short",
  fr: "La description du message est trop courte",
};
const submitError: any = {
  en: "Something went wrong. Please refresh and try again",
  fr: "Quelque chose s'est mal passé. Veuillez actualiser et réessayer",
};
const uploadedText: any = {
  en: "Uploaded",
  fr: "Téléchargé",
};
const confirmationText: any = {
  en: "Thank you for your feedback. Our support team will look into it",
  fr: "Merci pour votre avis. Notre équipe d'assistance examinera la question",
};
const confirmationTitle: any = {
  en: "Feedback received",
  fr: "Retour d'information reçu",
};
