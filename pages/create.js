//import styles from './create.module.scss';
//import styles from '@styles/create.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router'; // this is new
import { createPost } from '@lib/firebase'; // this is new
import styles from '@styles/create.module.scss';
import { useAuth } from '@contexts/auth';


const CreatePage = () => {
  const router = useRouter(); // this is new
  const [formValues, setFormValues] = useState({
    title: '',
    slug: '',
    coverImage: '',
    coverImageAlt: '',
    content: '',
  });

  const [isLoading, setIsLoading] = useState(false); // this is new
  const [user, userLoading] = useAuth();
  console.log(user, userLoading);
  console.log("user : "+user);
  console.log("userLoading : "+userLoading);

  if (userLoading) {
    return null;
  }

  if (!user && typeof window !== 'undefined') {
    router.push('/404');
    return null;
  }
  
  /*
  This is the function we're passing to each control so we can capture
  the value in it and store it in our `formValues` variable.
  */
  const handleChange = (e) => {
    const id = e.target.id;
    const newValue = e.target.value;

    setFormValues({ ...formValues, [id]: newValue });
  };

  /*
  This function is passed to the <form> and specifies what happens when
  the form is submitted. For now, we're going to log our `formValues`
  to verify that they are being managed correctly.
  
  Side note: we do not need to set an `onClick` for the <button> at the
  end of the form because it has type="submit". This allows us to click
  to submit the form or press the Enter key to submit it.
  */

  const handleSubmit = (e) => {
    // This prevents the default functionality of submitting a form
    e.preventDefault();

    // Check if there are any missing values.
    let missingValues = [];
    Object.entries(formValues).forEach(([key, value]) => {
      if (!value) {
        missingValues.push(key);
      }
    });

    // Alert and prevent the post from being created if there are missing values.
    if (missingValues.length > 1) {
      alert(`You're missing these fields: ${missingValues.join(', ')}`);
      return;
    }

    // Update the isLoading state.
    setIsLoading(true);

    // Start the attempt to create a new post.
    createPost(formValues)
      .then(() => {
        // Update the isLoading state and navigate to the home page.
        setIsLoading(false);
        router.push('/');
      })
      .catch((err) => {
        // Alert the error and update the isLoading state.
        alert(err);
        setIsLoading(false);
      });
  };


  return (
    <div className={styles.CreatePage}>
      <form onSubmit={handleSubmit}>
        <h1>Create a new post</h1>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={formValues.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="slug">Slug</label>
          <input
            id="slug"
            type="text"
            value={formValues.slug}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="coverImage">Cover Image URL</label>
          <input
            id="coverImage"
            type="text"
            value={formValues.coverImage}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="coverImageAlt">Cover Image Alt</label>
          <input
            id="coverImageAlt"
            type="text"
            value={formValues.coverImageAlt}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={formValues.content}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create'}
        </button>

      </form>
    </div>
  );
};


export default CreatePage;
