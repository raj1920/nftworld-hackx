import React from "react";
import {
  Activity,
  AttachedActivity,
  CommentField,
  CommentList,
  SinglePost,
  Audio
} from "react-activity-feed";

export default function Feed() {
  return (
    <div>
      <AttachedActivity
        activity={{
          attachments: {
            images: [
              "https://getstream.imgix.net/images/random_svg/A.png",
              "https://getstream.imgix.net/images/random_svg/B.png",
              "https://getstream.imgix.net/images/random_svg/C.png",
            ],
          },
          verb: "post",
        }}
      />
      <Audio
        og={{
          audios: [
            { secure_url: "https://media1.vocaroo.com/mp3/17SJoO2u3JcO" },
          ],
          images: [
            {
              image:
                "https://i1.sndcdn.com/artworks-000239059018-lxf0kl-t500x500.jpg",
            },
          ],
          title: "Jesse James",
          description: "Perla",
        }}
        handleClose={console.log}
      />
    </div>
  );
}
