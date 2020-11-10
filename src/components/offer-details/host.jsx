import hostProperties from "../../proptypes/host-properties";

const Host = ({description, name, is_pro: isPro, avatar_url: avatarUrl}) => {

  return (
    <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>
      <div className="property__host-user user">
        <div className={`property__avatar-wrapper ${isPro && `property__avatar-wrapper--pro`} user__avatar-wrapper`}>
          <img className="property__avatar user__avatar" src={avatarUrl} alt="Host avatar" width={74} height={74} />
        </div>
        <span className="property__user-name">
          {name}
        </span>
      </div>
      <div className="property__description">
        <p className="property__text">{description}</p>
      </div>
    </div>
  );

};

Host.propTypes = hostProperties;

export default Host;
