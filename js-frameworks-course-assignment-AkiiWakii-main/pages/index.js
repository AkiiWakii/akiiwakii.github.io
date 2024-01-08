import Layout from "../components/layout/Layout";
import Head from "../components/layout/Head";
import Button from "react-bootstrap/Button";
import { base_url } from "./api/api";
import axios from "axios";
import Link from "next/link";
import Heading from "../components/layout/Heading";

export default function Home(props) {
  return (
    <Layout>
      <Head title="Home" />
      <Heading content="Home" />
      {props.films.map((film) => {
        return (
          <div key={film.id} className="m-2 m-auto p-3">
            <h2>{film.title}</h2>
            <p>{film.description}</p>
            <Link key={film.slug} href={`film/${film.id}`} passHref>
              <Button>Details</Button>
            </Link>
          </div>
        );
      })}
    </Layout>
  );
}

export async function getStaticProps() {
  let films = [];
  try {
    const response = await axios.get(base_url);
    films = await response.data;
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      films: films,
    },
  };
}
