const model = require('../models/friendship_model');
const {get_common_data} = require('./user_controller');

_get_listable_user =
    async (user_id, user) => {
      return {
        ...await get_common_data(user_id),
        id: user_id,
        common_friends: await model.get_count_common(user_id, user),
      };
    };

_get_listable_users =
    async (users_id, user) => {
      let result = [];
      for (const user_id of users_id)
        if (user_id !== '')
          result.push(await _get_listable_user(user_id, user));
      return result;
    };

_getter =
    async (req, res, model_action) => res.json(
        await _get_listable_users(
            await model_action(req.user.id), req.user.id,
        ),
    );

_requester =
    async (req, res, model_action) => {
      if (await model_action(req.params.user_id, req.user.id) === true)
        res.sendStatus(202);
      else
        res.sendStatus(400);
    };

_get_received_requests =
    async (req, res) => {
      const temp_result = await model.get_received_requests(req.user.id);
      let result = [];
      for (const resultElement of temp_result) {
        result.push({
          date: resultElement.send_date,
          ...await _get_listable_user(resultElement.user_id2, req.user.id),
        });
      }
      return res.json(result);
    };

_get_sent_requests =
    async (req, res) => {
      const temp_result = await model.get_sent_requests(req.user.id);
      let result = [];
      for (const resultElement of temp_result) {
        result.push({
          date: resultElement.send_date,
          ...await _get_listable_user(resultElement.user_id2, req.user.id),
        });
      }
      return res.json(result);
    };

_get_friends =
    async (req, res) => _getter(req, res, model.get_user_friends);

_get_friends_by_id =
    async (user_id) => await model.get_user_friends(user_id);

_get_common_friends =
    async (req, res) => res.json(
        await _get_listable_users(
            await model.get_common(req.user.id, req.params.user_id),
        ),
    );

_get_suggested =
    async (req, res) => res.json(
        await _get_listable_users(
            await model.get_suggested(req.user.id, req.params.page_number),
            req.user.id,
        ),
    );

_send_request =
    async (req, res) => _requester(req, res, model.send_request);

_deny_request =
    async (req, res) => _requester(req, res, model.deny_request);

_accept_request =
    async (req, res) => _requester(req, res, model.accept_request);

_delete_friend =
    async (req, res) => _requester(req, res, model.delete_friend);

module.exports = {
  get_received_requests: _get_received_requests,
  get_sent_requests: _get_sent_requests,
  send_request: _send_request,
  deny_request: _deny_request,
  get_suggested: _get_suggested,
  get_common_friends: _get_common_friends,
  get_friends: _get_friends,
  accept_request: _accept_request,
  delete_friend: _delete_friend,
  get_friends_by_id: _get_friends_by_id,
};