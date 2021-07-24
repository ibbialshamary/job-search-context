import classes from "./JobSearchResult.module.scss";
import Button from "../../layout/Button/Button";
import FilteredJobItems from "./FilteredJobItems/FilteredJobItems";
import RecentJobItems from "./RecentJobItems/RecentJobItems";

const JobSearchResult = () => {
  return (
    <>
      <div className="flex-box-container">
        <div className={classes["job-search-reuslt-page-container"]}>
          <div>
            <br />
            <div className={classes["job-search-container"]}>
              <input
                type="text"
                className="mini-input no-border-right"
                placeholder="Location"
              />
              <input
                type="text"
                className="no-border-right no-border-left"
                placeholder="Role Title"
              />
              <Button class="mini-button no-border-left">Update Search</Button>
            </div>
            <br />
            <FilteredJobItems />
            <br />

            <RecentJobItems />
          </div>
        </div>
      </div>
    </>
  );
};

export default JobSearchResult;
