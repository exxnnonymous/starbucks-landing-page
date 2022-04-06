import PropTypes from "prop-types";

function Notification({ bg, text, border, title, desc }) {
  return (
    <div className={`border-2 ${bg} ${text} ${border} rounded-md py-2 px-2 `}>
      <h4 className="text-[15px] font-medium">{title}!</h4>
      <p className="text-sm">{desc}!</p>
    </div>
  );
}

export default Notification;

Notification.propTypes = {
  bg: PropTypes.string,
  text: PropTypes.string,
  border: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
};
