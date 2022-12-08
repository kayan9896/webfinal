import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAuth0 } from "@auth0/auth0-react";

// import ReactHtmlParser from "react-html-parser";
export default function Details() {
  const { isAuthenticated, user } = useAuth0();
  // console.log(user);
  // console.log(useParams());
  const navigate = useNavigate();
  const { sid } = useParams();
  const [gameDetails, setGameDetails] = useState({});

  const [commentText, setCommentText] = useState("");
  const [commentTextEdit, setCommentTextEdit] = useState("");

  const [submitButtonStatus, SetSubmitButtonStatus] = useState(false);
  const [submitEditButtonStatus, SetSubmitEditButtonStatus] = useState(false);

  const [commentData, setCommentData] = useState([]);
  const [onEditCommentId, setOnEditId] = useState(0);
  async function getComments() {
    let commentData = await axios.get(
      `https://gamewebsite.onrender.com/users/comments/${sid}`
    );
    // console.log(commentData.data)
    setCommentData(commentData.data);
  }
  useEffect(() => {
    async function getGameDetails() {
      let { data } = await axios.get(
        `https://gamewebsite.onrender.com/game/${sid}`
      );
      // console.log(data);
      if (data.ok) setGameDetails(data.details);
    }

    getGameDetails();
    getComments();
  }, []);

  async function submitCommentHandler() {
    if (!commentText.length) {
      return alert("Fill the text area first!");
    }
    SetSubmitButtonStatus(true);
	const gname = gameDetails.name;
	console.log(gname);
    let { data } = await axios.post("https://gamewebsite.onrender.com/users/new", {
      userId: user.sub,
      Comment: commentText,
      gameId: sid,
      nickname: user.nickname,
	  gamename: gname,
    });
	
    if (data.ok) {
      getComments();
      setCommentText("");
      alert("Thanks for your comment!");
    } else alert("error");
    SetSubmitButtonStatus(false);
  }

  async function submitEditedComment() {
    SetSubmitEditButtonStatus(true);
    let { data } = await axios.post(
      `https://gamewebsite.onrender.com/users/update/${onEditCommentId}`,
      {
        Comment: commentTextEdit,
        userId: user.sub,
      }
    );
    if (data.ok) {
      setOnEditId(null);
      setCommentTextEdit(null);
      getComments();
      alert("Your comment has been successfully edited!");
    } else alert("error");
    SetSubmitEditButtonStatus(false);
  }

  async function deleteCommentHandler(cId) {
    let confirmation = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmation) {
      let { data } = await axios.delete(
        `https://gamewebsite.onrender.com/users/comments/delete/${cId}`
      );

      if (data.ok) {
        getComments();
        alert("Comment Deleted!");
      }
    }
  }
  return (
    <div>
      <div className="buyArea_btn">
        <button
          onClick={() => {
            navigate("/buy", { state: { game: { ...gameDetails } } });
          }}
        >
          {Object.keys(gameDetails).length
            ? gameDetails?.["is_free"] === true || !gameDetails?.["price_overview"]
              ? "Get This Game for free!"
              : `Buy This Game! ${
              // gameDetails?.["price_overview"] &&
              gameDetails?.["price_overview"].final_formatted
              }`
            : null}
        </button>
      </div>
      <div className="details__area">
        <table className="details__table">
          <tbody>
            {Object.keys(gameDetails).map((key) => {
              switch (key) {
                case "header_image":
                  return (
                    <tr>
                      <td>{key}</td>
                      <td>
                        <embed src={gameDetails[key]} width={"30%"} />
                      </td>
                    </tr>
                  );
                case "pc_requirements":
                  return (
                    <React.Fragment>
                      <tr>
                        <td>Minimum PC requirements</td>
                        <td
                          dangerouslySetInnerHTML={{
                            __html: gameDetails[key].minimum,
                          }}
                        />
                      </tr>
                      <tr>
                        <td>recommended PC requirements</td>
                        <td
                          dangerouslySetInnerHTML={{
                            __html: gameDetails[key].recommended,
                          }}
                        />
                      </tr>
                    </React.Fragment>
                  );
                case "price_overview":
                  return (
                    <tr>
                      <td>Current Price</td>
                      <td>{gameDetails[key].final_formatted}</td>
                    </tr>
                  );
                case "genres":
                  const genres = gameDetails[key].map(
                    ({ description }) => description
                  );
                  return (
                    <tr>
                      <td>genres</td>
                      <td>{genres.join(", ")}</td>
                    </tr>
                  );

                case "categories":
                  const categories = gameDetails[key].map(
                    ({ description }) => description
                  );
                  return (
                    <tr>
                      <td>categories</td>
                      <td>{categories.join(", ")}</td>
                    </tr>
                  );

                case "release_date":
                  return (
                    <tr>
                      <td>Release date</td>
                      <td>{gameDetails[key]["date"]}</td>
                    </tr>
                  );
                case "screenshots":
                  return (
                    <tr>
                      <td style={{ borderBottomLeftRadius: 20 }}>
                        Screenshots
                      </td>
                      <td style={{ borderBottomRightRadius: 20 }}>
                        {gameDetails[key].map(({ path_thumbnail }) => (
                          <embed
                            src={path_thumbnail}
                            width={"20%"}
                            style={{ paddingRight: 10 }}
                          />
                        ))}
                      </td>
                    </tr>
                  );
                default:
                  return (
                    <tr>
                      <td
                        style={{ borderTopLeftRadius: key === "name" ? 20 : 0 }}
                      >
                        {key.replace("_", " ")}
                      </td>
                      <td
                        style={{
                          borderTopRightRadius: key === "name" ? 20 : 0,
                        }}
                        dangerouslySetInnerHTML={{ __html: gameDetails[key] }}
                      />
                    </tr>
                  );
              }
            })}
          </tbody>
        </table>
      </div>
      <div className="commentArea">
        {/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}
        <h2>Comments:</h2>
        {commentData.length ? (
          commentData.map((cm) => {
            return (
              <div className="commentArea_userComment">
                <div>
                  by <i>{cm.nickname}</i>
                  {isAuthenticated && user.sub === cm.userId && (
                    <div>
                      <span
                        style={{
                          marginRight: 20,
                          color: "#ff6d6d",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          deleteCommentHandler(cm.commentId);
                        }}
                      >
                        Delete
                      </span>
                      <span
                        style={{
                          color: "rgb(130, 164, 244)",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          if (onEditCommentId === cm.commentId)
                            return setOnEditId(null);
                          setOnEditId(cm.commentId);
                          setCommentTextEdit(cm.Comment);
                        }}
                      >
                        Edit
                      </span>
                    </div>
                  )}
                </div>
                <span>
                  posted at: {new Date(cm.createDate).toLocaleString()}
                </span>
                {onEditCommentId === cm.commentId ? (
                  <>
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={10}
                      placeholder="Write your comment..."
                      style={{ width: "50%" }}
                      className="commentArea_TextArea"
                      value={commentTextEdit}
                      onChange={(e) => setCommentTextEdit(e.target.value)}
                    />
                    <LoadingButton
                      size="large"
                      onClick={submitEditedComment}
                      loading={submitEditButtonStatus}
                      variant="outlined"
                      style={{ marginTop: 20, width: 200, marginBottom: 40 }}
                    >
                      Submit Edit
                    </LoadingButton>
                  </>
                ) : (
                  <p>{cm.Comment}</p>
                )}
              </div>
            );
          })
        ) : (
          <p>There is no comment</p>
        )}
        {isAuthenticated ? (
          <React.Fragment>
            <h3>Post your comment</h3>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={10}
              placeholder="Write your comment..."
              style={{ width: "50%" }}
              className="commentArea_TextArea"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <LoadingButton
              size="large"
              onClick={submitCommentHandler}
              loading={submitButtonStatus}
              variant="outlined"
              style={{ marginTop: 20, width: 200 }}
            >
              Submit
            </LoadingButton>
          </React.Fragment>
        ) : (
          <h4>Login First to post a comment</h4>
        )}
      </div>
    </div>
  );
}
