import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import './EmojiConfig.css';

const EmojiConfig = ({handleSeleteEmoji}) => {
  const emojiSeleted = (emoji) => {
      // console.log(emoji);
      // console.log(emoji.native);
      handleSeleteEmoji(emoji.native)
  }
  return (
    <>
      <div className="relative"></div>
      <div className="absolute container-emoji">
        <Picker data={data} onEmojiSelect={emojiSeleted} />
      </div>
    </>
  );
};

export default EmojiConfig;
