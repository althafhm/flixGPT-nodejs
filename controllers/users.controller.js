const openaiService = require("../services/openai.service");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const {
  systemPrompt,
  movieRecommendationPrompt,
} = require("../services/promts");

const userController = {
  suggestMovies: catchAsync(async (req, res, next) => {
    const { taste } = req.body;
    if (!taste)
      return next(new AppError("Please provide some categories", 400));

    const prompt = movieRecommendationPrompt.replace("{{taste}}", taste);

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ];

    // console.log(messages);

    const suggestedMovies = await openaiService.createMovieSuggestion(messages);

    // console.log(suggestedMovies);

    res.json({ suggestedMovies: JSON.parse(suggestedMovies) });
    // res.json('success');
  }),
};

module.exports = userController;
