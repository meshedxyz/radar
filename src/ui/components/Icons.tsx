interface Props {
  id: iconStates;
  classDetails: string;
}

export enum iconStates {
  Neutral = "Neutral",
  Positive = "Positive",
  Negative = "Negative",
  Trash = "Trash",
  Expand = "Expand",
  Collapse = "Collapse",
  Back = "Back",
}
const Icons = (props: Props) => {
  const { id, classDetails } = props;

  switch (id) {
    case iconStates.Neutral: {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classDetails + " text-blue-400 "}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    case iconStates.Positive: {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classDetails + " text-green-400 "}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    case iconStates.Negative: {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classDetails + " text-red-400"}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    case iconStates.Trash: {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classDetails + " text-slate-400"}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    case iconStates.Expand: {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classDetails + " text-slate-400"}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      );
    }
    case iconStates.Collapse: {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classDetails + " text-slate-400"}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      );
    }
    case iconStates.Back: {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classDetails}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    default: {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classDetails + " text-yellow-400 "}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
  }
};

export default Icons;
