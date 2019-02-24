import React from 'react';

export default function TasksFilter() {
  return (
    <div className="box has-background-light">
      <form className="form-horizontal">
        <fieldset>
          <legend>Filter</legend>

          <div className="field">
            <label className="label" />
            <div className="control">
              <input name="searchText" type="text" placeholder="Search text ..." className="input " />
            </div>
          </div>

          <div className="field">
            <label className="label">Status</label>
            <div className="control">
              <label className="radio">
                <input type="radio" name="taskStatus" value="Active" checked="checked" required="required" />
                Active
              </label>
              <label className="radio">
                <input type="radio" name="taskStatus" value="Inactive" required="required" />
                Inactive
              </label>
            </div>
          </div>
          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button className="button is-link" type="button">
                Filter
              </button>
            </div>
            <div className="control">
              <button className="button is-dark" type="button">
                Reset
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
