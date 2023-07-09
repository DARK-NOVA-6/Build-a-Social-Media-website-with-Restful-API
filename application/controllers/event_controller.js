const model = require('../models/event_model');

_add =
    async (req, res) => {
      const {text, date, time} = req.body;
      if (await model.add(text, date, time, req.user.id) === true)
        res.sendStatus(201);
      else
        res.sendStatus(400);
    };

_update =
    async (req, res) => {
      const {text, date, time, event_id} = req.body;
      if (await model.update(text, date, time, event_id, req.user.id) === true)
        res.sendStatus(201);
      else
        res.sendStatus(400);
    };

_join =
    async (req, res) => {
      if (await model.join(req.params.event_id, req.user.id) === true)
        res.sendStatus(201);
      else
        res.sendStatus(400);
    };

_undo_join =
    async (req, res) => {
      if (await model.undo_join(req.params.event_id, req.user.id) === true)
        res.sendStatus(202);
      else
        res.sendStatus(400);
    };

_delete =
    async (req, res) => {
      if (await model.delete(req.params.event_id, req.user.id) === true)
        res.sendStatus(202);
      else
        res.sendStatus(400);
    };

_get_all =
    async (req, res) => {
      const result = await model.get_all();
      const {get_common_data} = require('./user_controller');
      for (const resultElement of result)
        resultElement.author = await get_common_data(
            resultElement.user_account_id);
      return res.json(result);
    };

_get_interested =
    async (req, res) => {
      const temp_result = await model.get_interested(req.params.event_id);
      const {get_common_data} = require('./user_controller');
      const result = [];
      for (const resultElement of temp_result)
        result.push(await get_common_data(resultElement.user_account_id));
      return res.json(result);
    };

module.exports = {
  add: _add,
  update: _update,
  join: _join,
  undo_join: _undo_join,
  delete: _delete,
  get_all: _get_all,
  get_interested: _get_interested,
};