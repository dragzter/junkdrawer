const mongoose = require("mongoose");
const { Schema } = mongoose;

/** Example

const user = {
  name: "Bob",
  id: "some-id-1",
  local_id: "local-id-1",
  email: "bob@gmail.com",
  picture: "https://someplace.com/image.jpg",
  custom_avatar_url: "https://someotherplace.com/custom.jpg",
  junkdrawer_images: {
    "guid-1": {
      name: "filename.png",
      id: "guid-1",
      likes: 23
    },
    "guid-2": {
      name: "filename6.png",
      id: "guid-2",
      likes: 0
    },
  },
  nickname: "Fredo"
  custom_attributes: {
    "attr-1": {
      signed_up: true,
    },
    "attr-2": {
      premium_user: true,
    },
  },
  disabled: false,
  rank: "203"
};

 */

module.exports = new Schema({
  name: {
    type: String,
    required: true,
  }, // String is shorthand for {type: String}
  id: {
    type: String,
    required: true,
  }, // The ID the user came with
  local_id: {
    type: String,
    required: true,
  }, // Assigned by this server
  email: {
    type: String,
    required: true,
  },
  email_verified: {
    type: Boolean,
    required: false,
  },
  picture: {
    type: String,
    required: false,
  },
  nickname: {
    type: String,
    required: false,
  },
  custom_avatar_url: {
    type: String,
    required: false,
  },
  junkdrawer_images: {
    type: Object,
    required: false,
  },
  custom_attributes: {
    type: Object,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  rank: String,
});
