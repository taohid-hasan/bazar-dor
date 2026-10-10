import ALLproduct from "@/Components/ALLproduct";
import Banner from "@/Components/Banner";
import ProductDown from "@/Components/ProductDown";
import ProductUp from "@/Components/ProductUp";

export default function Home() {
  return (
    <div>
      <Banner />
      <ProductUp />
      <ProductDown />
      <ALLproduct />
    </div>
  );
}
