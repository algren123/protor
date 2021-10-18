import { useState } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Navbar from '../../components/navbar';
import Login from '../login';
import axios from 'axios';
import Swal from 'sweetalert2';
import Link from 'next/link';

function UpdatePost({ posts }) {
  const router = useRouter();
  const { id } = router.query;
  let post = posts.filter((post) => post._id === id)[0];

  const [session, loading] = useSession();
  const [invalid, setInvalid] = useState(false);
  const [postcode, setPostcode] = useState(post.location);
  const [profession, setProfession] = useState(post.profession);
  const [desc, setDesc] = useState(post.description);
  const [budget, setBudget] = useState(post.budget);
  const type = post.type;

  const postcodeRegex =
    /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;
  const professions = [
    'Builder',
    'Carpenter',
    'Electrician',
    'Gardener',
    'Handyman',
    'Painter',
    'Plumber',
    'Roofer',
    'Tiler',
  ];

  function handlePostcodeChange(event) {
    if (event.target.value.match(postcodeRegex) !== null) {
      setInvalid(false);
      setPostcode(event.target.value);
    } else {
      setInvalid(true);
      setPostcode(event.target.value);
    }
  }

  function onSubmit(event) {
    event.preventDefault();

    if (desc === '' || postcode === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all the fields',
      });
    } else if (invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter correct postcode',
      });
    } else {
      let postData = {
        user: session.user.name,
        email: session.user.email,
        profilePic: session.user.image,
        type: type,
        profession: profession,
        description: desc,
        budget: budget,
        location: postcode.toUpperCase(),
      };

      return axios
        .post(
          'https://protor-backend.herokuapp.com/posts/update/' + id,
          postData
        )
        .then((res) => {
          if (res.status == 200) {
            window.location = '/';
          }
        });
    }
  }

  return (
    <>
      {!session ? (
        <Login />
      ) : (
        <div className="h-screen bg-dark-grey">
          <Navbar />
          <div className="flex justify-center">
            <div className="bg-light-grey text-center mt-12 h-full lg:py-5 w-80 lg:w-120 rounded-md pb-5">
              <h1 className="text-primary-500 text-4xl font-bold mt-6">
                Edit Post
              </h1>
              <div className="my-5">
                <h3 className="flex flex-col font-bold text-xl text-primary-500 my-3 lg:mx-20">
                  Profession:
                  <select
                    name="professionSelect"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="bg-dark-grey text-cadet-blue-50 outline-none border-primary border-2 text-lg text-center rounded-md px-2 mx-14 mt-2"
                  >
                    {professions.map((profession) => (
                      <option value={profession} key={profession}>
                        {' '}
                        {profession}{' '}
                      </option>
                    ))}
                  </select>
                </h3>
                <h3 className="flex flex-col font-bold text-xl text-primary-500 my-3 lg:mx-20">
                  Postcode:
                  <input
                    type="text"
                    value={postcode}
                    onChange={(e) => handlePostcodeChange(e)}
                    className={
                      (invalid ? 'border-primary-600 ' : 'border-primary ') +
                      'outline-none rounded-md bg-dark-grey my-3 px-5 mx-14 border-2 text-lg text-center text-cadet-blue-50'
                    }
                    name="postcode"
                    id="postcode"
                  />
                  <p
                    className={
                      (invalid ? 'block ' : 'hidden ') +
                      'text-primary-600 font-semibold text-lg'
                    }
                  >
                    Postcode is incorrect format e.g. "NE10 0ZT"
                  </p>
                </h3>
                <h3 className="flex flex-col font-bold text-xl text-primary-500 my-3 lg:mx-20">
                  Description:
                  <textarea
                    rows="4"
                    cols="25"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="outline-none rounded-md resize-none bg-dark-grey mt-3 px-5 mx-6 text-lg border-2 border-primary text-cadet-blue-50"
                    name="requestDesc"
                    id="requestDesc"
                  />
                </h3>
                <h3
                  className={
                    'flex flex-col font-bold text-xl text-primary-500 mt-3 lg:mx-20 ' +
                    (type === 'request' ? 'block' : 'hidden')
                  }
                >
                  Budget:
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="outline-none rounded-md bg-dark-grey mt-3 px-5 mx-14 border-2 border-primary text-cadet-blue-50"
                    name="budget"
                    id="budget"
                  />
                </h3>
              </div>
              <Link href="/profile">
                <button className="bg-primary font-semibold rounded-full px-10 py-2 w-50 mb-5 mt-3 mx-2">
                  Back
                </button>
              </Link>
              <button
                className="bg-primary font-semibold rounded-full px-10 py-2 w-50 mb-5 mt-3 mx-2"
                onClick={() => onSubmit(event)}
              >
                Submit edit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export async function getStaticPaths() {
  const posts = await axios
    .get('https://protor-backend.herokuapp.com/posts/')
    .then((res) => {
      return res.data;
    });
  const paths = posts.map((post) => ({
    params: { id: post._id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const posts = await axios
    .get('https://protor-backend.herokuapp.com/posts/')
    .then((res) => {
      return res.data;
    });
  return {
    props: {
      posts,
    },
  };
}

export default UpdatePost;
