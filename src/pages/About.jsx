import BackButton from "../components/BackButton";

export default function About() {
  return (
    <div className="container about-page">
      <BackButton />
      <h1>About Ontor's World Web</h1>
      <p>
        World Web is an educational platform for exploring basic information
        about countries around the world. This website is built by Developer Md.
        Ontor Sheikh (mail: skontorsheikh1613@gmail.com)
      </p>
      <p>
        Data is stored client-side for fast, serverless access and to make this
        project easy to deploy on Netlify.
      </p>
    </div>
  );
}
