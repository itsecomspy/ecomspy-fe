import styled from "styled-components";
import { Button } from "@components/Button";
import pattern from "@assets/images/landing/markets/pattern.png";

const Close = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem 2rem;
  font-size: 24px;
  cursor: pointer;
`;

const BannerWrapper = styled.div<{
  $fixed?: boolean;
}>`
  margin-left: 2rem;
  margin-right: 2rem;
  position: relative;
  display: flex;
  max-width: 1512px;
  width: 100%;
  height: 100%;
  min-height: 392px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 64px;
  background: #3a44e4;
  border-radius: 24px;
  background-image: url(${pattern});
  background-position: top left;
  background-size: cover;
  background-repeat: no-repeat;
  @media screen and (max-width: 1024px) {
    min-height: auto;
    gap: 32px;
    padding: 64px 0;
  }
  ${(props) =>
    props.$fixed
      ? `
    max-width: 1304px;
    height: max-content;
    margin: auto;
  `
      : ``}
`;

export const Banner = ({
  subtitle,
  title,
  buttonText,
  action,
  handleClose,
  fixed,
}: {
  subtitle: string;
  title: string;
  buttonText: string;
  action: () => void;
  handleClose: () => void;
  fixed?: boolean;
}) => {
  return (
    <div
      className="py-[64px] lg:py-[104px] flex flex-col w-full"
      style={
        fixed
          ? {
              position: "fixed",
              zIndex: 10,
              inset: 0,
              height: "100%",
              width: "100%",
              background: "rgba(0,0,0,.85)",
              margin: "auto",
            }
          : {}
      }
    >
      <BannerWrapper $fixed={fixed}>
        <Close onClick={handleClose}>&#x2715;</Close>
        <div className="text-center">
          <p className="landing-text-color mb-4 text-sm uppercase">
            {subtitle}
          </p>
          <p className="px-2 max-w-[541px] text-2xl md:text-3xl font-medium lg:text-h2 lg:text-display-2">
            {title}
          </p>
        </div>
        <Button
          backgroundColor="white"
          color="#010519"
          size="large"
          text={buttonText}
          action={action}
        />
      </BannerWrapper>
    </div>
  );
};

// const subtitle: any = {
//   en: "Get Started",
//   fr: "Commencer",
// };
// const title: any = {
//   en: "Explore our plans to get started",
//   fr: "Découvrez nos plans pour commencer",
// };
// const buttonText: any = {
//   en: "View plans",
//   fr: "Voir les plans",
// };
