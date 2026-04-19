async function createChat(req, res) {
  const { message } = req.body;

  // Placeholder controller to keep route functional until chat logic is implemented.
  return res.status(200).json({
    message: "Chat endpoint is working",
    input: message ?? null,
  });
}

module.exports = {
  createChat,
};
