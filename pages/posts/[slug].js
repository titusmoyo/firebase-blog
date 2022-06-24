import { useRouter } from 'next/router';
import styles from '@styles/post.module.scss';
import { getPostBySlug } from '@lib/firebase';
import { getFormattedDate } from '@lib/utils';

/*
const PostPage = ({ post }) => {
  const router = useRouter();
  const { slug } = router.query;

  return (
  <div className={styles.PostPage}>
    <img src={post.coverImage} alt={post.coverImageAlt} />
    <h1>{post.title}</h1>
    <span>Published {getFormattedDate(post.dateCreated)}</span>
    <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
  </div>
  );

};*/
const PostPage = ({ post }) => (
  <div className={styles.PostPage}>
    <img src={post.coverImage} alt={post.coverImageAlt} />
    <h1>{post.title}</h1>
    <span>Published {getFormattedDate(post.dateCreated)}</span>
    <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
  </div>
);

export async function getServerSideProps(context) {
  const post = await getPostBySlug(context.query.slug);
  return {
    props: {
      post,
    },
  };
}


export default PostPage;
