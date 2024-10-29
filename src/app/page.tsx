import Image from "next/image";
import styles from "./page.module.css";
import FormPage from "../components/form/form";

const Page: React.FC = () => {
  return (
    <div className="container">
      <div className="row">
        <FormPage />
      </div>
    </div>
  );
};

export default Page;
