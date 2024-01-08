import axios from "axios";
import Link from "next/link";
import { Button } from "react-bootstrap";
import Head from "../../components/layout/Head";
import Layout from "../../components/layout/Layout";
import { base_url } from "../api/api";

export default function Film({ film }) {
  return (
    <Layout>
      <Head title={film.title} />
      <h1>English Title: {film.title}</h1>
      <h2>Original Title: {film.original_title}</h2>
      <h3>Release Year: {film.release_date}</h3>
      <p>{film.description}</p>
      <Link href="/" passHref>
        <Button>Go Back</Button>
      </Link>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const response = await axios.get(base_url);
    const films = response.data;
    const paths = films.map((film) => ({
      params: { slug: film.id },
    }));
    console.log(paths);
    return { paths: paths, fallback: false };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({ params }) {
  const url = `${base_url}/${params.slug}`;

  let film = null;
  try {
    const response = await axios.get(url);
    film = response.data;
  } catch (error) {
    console.log(error);
  }
  return {
    props: { film: film },
  };
}
