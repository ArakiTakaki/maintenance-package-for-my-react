import React from "react";
import AppBar from "~/components/organisms/AppBar";
import RoomDrawer from "~/components/organisms/RoomDrawer";
import CreateRoomDialog from "~/components/organisms/CreateRoomDialog";
import EditNameDialog from "~/components/organisms/EditNameDialog";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import * as Actions from "~/store/actions";
import * as API from "~/util/api";

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});
const mapStateToProps = state => ({ store: state });

@withRouter
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.moveToLinkFunc = this.moveToLinkFunc.bind(this);
    this.onCreateRoom = this.onCreateRoom.bind(this);
    this.onOpenRoomListDrawer = this.onOpenRoomListDrawer.bind(this);
  }

  componentWillMount() {
    const { actions, history, location, store } = this.props;
    actions.progressStart();
    API.fetchRooms()
      .then(res => {
        if (res.data.length === 0) {
          actions.createRoomOpen();
          actions.progressStart();
          return;
        }
        if ("/" === location.pathname) {
          history.replace("/welcome");
        }
        actions.setRoomList(res.data);
      })
      .catch(() => {
        // TODO エラーのいい感じな処理
      })
      .finally(() => {
        actions.progressEnd();
      });

    API.fetchUser()
      .then(res => {
        if (store.user === "") actions.setUserName(res.data.user);
        actions.setAuthUserName(res.data.user);
        actions.setAuthUserImage(res.data.image);
      })
      .catch(e => {
        console.error(e);
      });
  }

  onSubmit(roomName) {
    const { actions, history } = this.props;
    actions.progressStart();
    API.createRoom(roomName)
      .then(res => {
        const { ok, message, room } = res.data;
        actions.messageOpen(message);
        if (!ok) return;
        actions.addRoomList(room);
        actions.createRoomClose();
        history.replace(`/room/${room.name}`);
      })
      .catch(() => {
        //ERRORのいいÏ感じの処理
      })
      .finally(() => {
        actions.progressEnd();
      });
  }

  moveToLinkFunc(name) {
    this.props.history.push(`/room/${name}`);
    this.props.actions.roomListClose();
  }

  onCreateRoom() {
    this.props.actions.roomListClose();
    setTimeout(() => {
      this.props.actions.createRoomOpen();
    }, 0);
  }

  onOpenRoomListDrawer() {
    const { actions } = this.props;
    // API.fetchRooms().then(res => {
    //   actions.setRoomList(res.data);
    // });
    // TODO チャットルームのログも取らないと面倒なことになるので一旦保留
    actions.roomListOpen();
  }

  render() {
    const { store, actions } = this.props;
    return (
      <div>
        <CreateRoomDialog
          open={store.isCreateRoomDialogOpen}
          onClose={actions.createRoomClose}
          onSubmit={roomName => {
            this.onSubmit(roomName);
          }}
        />
        <AppBar
          head={store.head}
          user={store.user}
          authImage={store.authImage}
          onClickCreateRoom={actions.createRoomOpen}
          onClickRoomList={this.onOpenRoomListDrawer}
          onEditNameDialogOpen={actions.userNameDialogOpen}
        />
        <RoomDrawer
          onClose={actions.roomListClose}
          onOpen={this.onOpenRoomListDrawer}
          open={store.isRoomListDrawerOpen}
          rooms={store.rooms}
          funcMoveToLink={this.moveToLinkFunc}
          onOpenCreateRoom={this.onCreateRoom}
        />
        <EditNameDialog
          authUser={store.authUser}
          authImage={store.authImage}
          user={store.user}
          open={store.isUserNameDialogOpen}
          onClose={actions.userNameDialogClose}
          onSubmit={userName => {
            actions.setUserName(userName);
          }}
        />
      </div>
    );
  }
}

export default Index;
