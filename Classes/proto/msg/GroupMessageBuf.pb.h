// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: GroupMessageBuf.proto

#ifndef PROTOBUF_GroupMessageBuf_2eproto__INCLUDED
#define PROTOBUF_GroupMessageBuf_2eproto__INCLUDED

#include <string>

#include <google/protobuf/stubs/common.h>

#if GOOGLE_PROTOBUF_VERSION < 2005000
#error This file was generated by a newer version of protoc which is
#error incompatible with your Protocol Buffer headers.  Please update
#error your headers.
#endif
#if 2005000 < GOOGLE_PROTOBUF_MIN_PROTOC_VERSION
#error This file was generated by an older version of protoc which is
#error incompatible with your Protocol Buffer headers.  Please
#error regenerate this file with a newer version of protoc.
#endif

#include <google/protobuf/generated_message_util.h>
#include <google/protobuf/message.h>
#include <google/protobuf/repeated_field.h>
#include <google/protobuf/extension_set.h>
#include <google/protobuf/unknown_field_set.h>
// @@protoc_insertion_point(includes)

namespace com {
namespace huizhi {
namespace im {
namespace protobuf {

// Internal implementation detail -- do not call these.
void  protobuf_AddDesc_GroupMessageBuf_2eproto();
void protobuf_AssignDesc_GroupMessageBuf_2eproto();
void protobuf_ShutdownFile_GroupMessageBuf_2eproto();

class GroupMessage;
class GroupMessageInfo;

// ===================================================================

class GroupMessage : public ::google::protobuf::Message {
 public:
  GroupMessage();
  virtual ~GroupMessage();

  GroupMessage(const GroupMessage& from);

  inline GroupMessage& operator=(const GroupMessage& from) {
    CopyFrom(from);
    return *this;
  }

  inline const ::google::protobuf::UnknownFieldSet& unknown_fields() const {
    return _unknown_fields_;
  }

  inline ::google::protobuf::UnknownFieldSet* mutable_unknown_fields() {
    return &_unknown_fields_;
  }

  static const ::google::protobuf::Descriptor* descriptor();
  static const GroupMessage& default_instance();

  void Swap(GroupMessage* other);

  // implements Message ----------------------------------------------

  GroupMessage* New() const;
  void CopyFrom(const ::google::protobuf::Message& from);
  void MergeFrom(const ::google::protobuf::Message& from);
  void CopyFrom(const GroupMessage& from);
  void MergeFrom(const GroupMessage& from);
  void Clear();
  bool IsInitialized() const;

  int ByteSize() const;
  bool MergePartialFromCodedStream(
      ::google::protobuf::io::CodedInputStream* input);
  void SerializeWithCachedSizes(
      ::google::protobuf::io::CodedOutputStream* output) const;
  ::google::protobuf::uint8* SerializeWithCachedSizesToArray(::google::protobuf::uint8* output) const;
  int GetCachedSize() const { return _cached_size_; }
  private:
  void SharedCtor();
  void SharedDtor();
  void SetCachedSize(int size) const;
  public:

  ::google::protobuf::Metadata GetMetadata() const;

  // nested types ----------------------------------------------------

  // accessors -------------------------------------------------------

  // required int32 groupId = 1;
  inline bool has_groupid() const;
  inline void clear_groupid();
  static const int kGroupIdFieldNumber = 1;
  inline ::google::protobuf::int32 groupid() const;
  inline void set_groupid(::google::protobuf::int32 value);

  // required int32 msgSize = 2;
  inline bool has_msgsize() const;
  inline void clear_msgsize();
  static const int kMsgSizeFieldNumber = 2;
  inline ::google::protobuf::int32 msgsize() const;
  inline void set_msgsize(::google::protobuf::int32 value);

  // repeated .com.huizhi.im.protobuf.GroupMessageInfo groupMessageInfo = 3;
  inline int groupmessageinfo_size() const;
  inline void clear_groupmessageinfo();
  static const int kGroupMessageInfoFieldNumber = 3;
  inline const ::com::huizhi::im::protobuf::GroupMessageInfo& groupmessageinfo(int index) const;
  inline ::com::huizhi::im::protobuf::GroupMessageInfo* mutable_groupmessageinfo(int index);
  inline ::com::huizhi::im::protobuf::GroupMessageInfo* add_groupmessageinfo();
  inline const ::google::protobuf::RepeatedPtrField< ::com::huizhi::im::protobuf::GroupMessageInfo >&
      groupmessageinfo() const;
  inline ::google::protobuf::RepeatedPtrField< ::com::huizhi::im::protobuf::GroupMessageInfo >*
      mutable_groupmessageinfo();

  // @@protoc_insertion_point(class_scope:com.huizhi.im.protobuf.GroupMessage)
 private:
  inline void set_has_groupid();
  inline void clear_has_groupid();
  inline void set_has_msgsize();
  inline void clear_has_msgsize();

  ::google::protobuf::UnknownFieldSet _unknown_fields_;

  ::google::protobuf::int32 groupid_;
  ::google::protobuf::int32 msgsize_;
  ::google::protobuf::RepeatedPtrField< ::com::huizhi::im::protobuf::GroupMessageInfo > groupmessageinfo_;

  mutable int _cached_size_;
  ::google::protobuf::uint32 _has_bits_[(3 + 31) / 32];

  friend void  protobuf_AddDesc_GroupMessageBuf_2eproto();
  friend void protobuf_AssignDesc_GroupMessageBuf_2eproto();
  friend void protobuf_ShutdownFile_GroupMessageBuf_2eproto();

  void InitAsDefaultInstance();
  static GroupMessage* default_instance_;
};
// -------------------------------------------------------------------

class GroupMessageInfo : public ::google::protobuf::Message {
 public:
  GroupMessageInfo();
  virtual ~GroupMessageInfo();

  GroupMessageInfo(const GroupMessageInfo& from);

  inline GroupMessageInfo& operator=(const GroupMessageInfo& from) {
    CopyFrom(from);
    return *this;
  }

  inline const ::google::protobuf::UnknownFieldSet& unknown_fields() const {
    return _unknown_fields_;
  }

  inline ::google::protobuf::UnknownFieldSet* mutable_unknown_fields() {
    return &_unknown_fields_;
  }

  static const ::google::protobuf::Descriptor* descriptor();
  static const GroupMessageInfo& default_instance();

  void Swap(GroupMessageInfo* other);

  // implements Message ----------------------------------------------

  GroupMessageInfo* New() const;
  void CopyFrom(const ::google::protobuf::Message& from);
  void MergeFrom(const ::google::protobuf::Message& from);
  void CopyFrom(const GroupMessageInfo& from);
  void MergeFrom(const GroupMessageInfo& from);
  void Clear();
  bool IsInitialized() const;

  int ByteSize() const;
  bool MergePartialFromCodedStream(
      ::google::protobuf::io::CodedInputStream* input);
  void SerializeWithCachedSizes(
      ::google::protobuf::io::CodedOutputStream* output) const;
  ::google::protobuf::uint8* SerializeWithCachedSizesToArray(::google::protobuf::uint8* output) const;
  int GetCachedSize() const { return _cached_size_; }
  private:
  void SharedCtor();
  void SharedDtor();
  void SetCachedSize(int size) const;
  public:

  ::google::protobuf::Metadata GetMetadata() const;

  // nested types ----------------------------------------------------

  // accessors -------------------------------------------------------

  // required int32 type = 1;
  inline bool has_type() const;
  inline void clear_type();
  static const int kTypeFieldNumber = 1;
  inline ::google::protobuf::int32 type() const;
  inline void set_type(::google::protobuf::int32 value);

  // required int32 userId = 2;
  inline bool has_userid() const;
  inline void clear_userid();
  static const int kUserIdFieldNumber = 2;
  inline ::google::protobuf::int32 userid() const;
  inline void set_userid(::google::protobuf::int32 value);

  // optional string userPhoto = 3;
  inline bool has_userphoto() const;
  inline void clear_userphoto();
  static const int kUserPhotoFieldNumber = 3;
  inline const ::std::string& userphoto() const;
  inline void set_userphoto(const ::std::string& value);
  inline void set_userphoto(const char* value);
  inline void set_userphoto(const char* value, size_t size);
  inline ::std::string* mutable_userphoto();
  inline ::std::string* release_userphoto();
  inline void set_allocated_userphoto(::std::string* userphoto);

  // optional string nickName = 4;
  inline bool has_nickname() const;
  inline void clear_nickname();
  static const int kNickNameFieldNumber = 4;
  inline const ::std::string& nickname() const;
  inline void set_nickname(const ::std::string& value);
  inline void set_nickname(const char* value);
  inline void set_nickname(const char* value, size_t size);
  inline ::std::string* mutable_nickname();
  inline ::std::string* release_nickname();
  inline void set_allocated_nickname(::std::string* nickname);

  // required bytes content = 5;
  inline bool has_content() const;
  inline void clear_content();
  static const int kContentFieldNumber = 5;
  inline const ::std::string& content() const;
  inline void set_content(const ::std::string& value);
  inline void set_content(const char* value);
  inline void set_content(const void* value, size_t size);
  inline ::std::string* mutable_content();
  inline ::std::string* release_content();
  inline void set_allocated_content(::std::string* content);

  // required int64 created = 6;
  inline bool has_created() const;
  inline void clear_created();
  static const int kCreatedFieldNumber = 6;
  inline ::google::protobuf::int64 created() const;
  inline void set_created(::google::protobuf::int64 value);

  // @@protoc_insertion_point(class_scope:com.huizhi.im.protobuf.GroupMessageInfo)
 private:
  inline void set_has_type();
  inline void clear_has_type();
  inline void set_has_userid();
  inline void clear_has_userid();
  inline void set_has_userphoto();
  inline void clear_has_userphoto();
  inline void set_has_nickname();
  inline void clear_has_nickname();
  inline void set_has_content();
  inline void clear_has_content();
  inline void set_has_created();
  inline void clear_has_created();

  ::google::protobuf::UnknownFieldSet _unknown_fields_;

  ::google::protobuf::int32 type_;
  ::google::protobuf::int32 userid_;
  ::std::string* userphoto_;
  ::std::string* nickname_;
  ::std::string* content_;
  ::google::protobuf::int64 created_;

  mutable int _cached_size_;
  ::google::protobuf::uint32 _has_bits_[(6 + 31) / 32];

  friend void  protobuf_AddDesc_GroupMessageBuf_2eproto();
  friend void protobuf_AssignDesc_GroupMessageBuf_2eproto();
  friend void protobuf_ShutdownFile_GroupMessageBuf_2eproto();

  void InitAsDefaultInstance();
  static GroupMessageInfo* default_instance_;
};
// ===================================================================


// ===================================================================

// GroupMessage

// required int32 groupId = 1;
inline bool GroupMessage::has_groupid() const {
  return (_has_bits_[0] & 0x00000001u) != 0;
}
inline void GroupMessage::set_has_groupid() {
  _has_bits_[0] |= 0x00000001u;
}
inline void GroupMessage::clear_has_groupid() {
  _has_bits_[0] &= ~0x00000001u;
}
inline void GroupMessage::clear_groupid() {
  groupid_ = 0;
  clear_has_groupid();
}
inline ::google::protobuf::int32 GroupMessage::groupid() const {
  return groupid_;
}
inline void GroupMessage::set_groupid(::google::protobuf::int32 value) {
  set_has_groupid();
  groupid_ = value;
}

// required int32 msgSize = 2;
inline bool GroupMessage::has_msgsize() const {
  return (_has_bits_[0] & 0x00000002u) != 0;
}
inline void GroupMessage::set_has_msgsize() {
  _has_bits_[0] |= 0x00000002u;
}
inline void GroupMessage::clear_has_msgsize() {
  _has_bits_[0] &= ~0x00000002u;
}
inline void GroupMessage::clear_msgsize() {
  msgsize_ = 0;
  clear_has_msgsize();
}
inline ::google::protobuf::int32 GroupMessage::msgsize() const {
  return msgsize_;
}
inline void GroupMessage::set_msgsize(::google::protobuf::int32 value) {
  set_has_msgsize();
  msgsize_ = value;
}

// repeated .com.huizhi.im.protobuf.GroupMessageInfo groupMessageInfo = 3;
inline int GroupMessage::groupmessageinfo_size() const {
  return groupmessageinfo_.size();
}
inline void GroupMessage::clear_groupmessageinfo() {
  groupmessageinfo_.Clear();
}
inline const ::com::huizhi::im::protobuf::GroupMessageInfo& GroupMessage::groupmessageinfo(int index) const {
  return groupmessageinfo_.Get(index);
}
inline ::com::huizhi::im::protobuf::GroupMessageInfo* GroupMessage::mutable_groupmessageinfo(int index) {
  return groupmessageinfo_.Mutable(index);
}
inline ::com::huizhi::im::protobuf::GroupMessageInfo* GroupMessage::add_groupmessageinfo() {
  return groupmessageinfo_.Add();
}
inline const ::google::protobuf::RepeatedPtrField< ::com::huizhi::im::protobuf::GroupMessageInfo >&
GroupMessage::groupmessageinfo() const {
  return groupmessageinfo_;
}
inline ::google::protobuf::RepeatedPtrField< ::com::huizhi::im::protobuf::GroupMessageInfo >*
GroupMessage::mutable_groupmessageinfo() {
  return &groupmessageinfo_;
}

// -------------------------------------------------------------------

// GroupMessageInfo

// required int32 type = 1;
inline bool GroupMessageInfo::has_type() const {
  return (_has_bits_[0] & 0x00000001u) != 0;
}
inline void GroupMessageInfo::set_has_type() {
  _has_bits_[0] |= 0x00000001u;
}
inline void GroupMessageInfo::clear_has_type() {
  _has_bits_[0] &= ~0x00000001u;
}
inline void GroupMessageInfo::clear_type() {
  type_ = 0;
  clear_has_type();
}
inline ::google::protobuf::int32 GroupMessageInfo::type() const {
  return type_;
}
inline void GroupMessageInfo::set_type(::google::protobuf::int32 value) {
  set_has_type();
  type_ = value;
}

// required int32 userId = 2;
inline bool GroupMessageInfo::has_userid() const {
  return (_has_bits_[0] & 0x00000002u) != 0;
}
inline void GroupMessageInfo::set_has_userid() {
  _has_bits_[0] |= 0x00000002u;
}
inline void GroupMessageInfo::clear_has_userid() {
  _has_bits_[0] &= ~0x00000002u;
}
inline void GroupMessageInfo::clear_userid() {
  userid_ = 0;
  clear_has_userid();
}
inline ::google::protobuf::int32 GroupMessageInfo::userid() const {
  return userid_;
}
inline void GroupMessageInfo::set_userid(::google::protobuf::int32 value) {
  set_has_userid();
  userid_ = value;
}

// optional string userPhoto = 3;
inline bool GroupMessageInfo::has_userphoto() const {
  return (_has_bits_[0] & 0x00000004u) != 0;
}
inline void GroupMessageInfo::set_has_userphoto() {
  _has_bits_[0] |= 0x00000004u;
}
inline void GroupMessageInfo::clear_has_userphoto() {
  _has_bits_[0] &= ~0x00000004u;
}
inline void GroupMessageInfo::clear_userphoto() {
  if (userphoto_ != &::google::protobuf::internal::kEmptyString) {
    userphoto_->clear();
  }
  clear_has_userphoto();
}
inline const ::std::string& GroupMessageInfo::userphoto() const {
  return *userphoto_;
}
inline void GroupMessageInfo::set_userphoto(const ::std::string& value) {
  set_has_userphoto();
  if (userphoto_ == &::google::protobuf::internal::kEmptyString) {
    userphoto_ = new ::std::string;
  }
  userphoto_->assign(value);
}
inline void GroupMessageInfo::set_userphoto(const char* value) {
  set_has_userphoto();
  if (userphoto_ == &::google::protobuf::internal::kEmptyString) {
    userphoto_ = new ::std::string;
  }
  userphoto_->assign(value);
}
inline void GroupMessageInfo::set_userphoto(const char* value, size_t size) {
  set_has_userphoto();
  if (userphoto_ == &::google::protobuf::internal::kEmptyString) {
    userphoto_ = new ::std::string;
  }
  userphoto_->assign(reinterpret_cast<const char*>(value), size);
}
inline ::std::string* GroupMessageInfo::mutable_userphoto() {
  set_has_userphoto();
  if (userphoto_ == &::google::protobuf::internal::kEmptyString) {
    userphoto_ = new ::std::string;
  }
  return userphoto_;
}
inline ::std::string* GroupMessageInfo::release_userphoto() {
  clear_has_userphoto();
  if (userphoto_ == &::google::protobuf::internal::kEmptyString) {
    return NULL;
  } else {
    ::std::string* temp = userphoto_;
    userphoto_ = const_cast< ::std::string*>(&::google::protobuf::internal::kEmptyString);
    return temp;
  }
}
inline void GroupMessageInfo::set_allocated_userphoto(::std::string* userphoto) {
  if (userphoto_ != &::google::protobuf::internal::kEmptyString) {
    delete userphoto_;
  }
  if (userphoto) {
    set_has_userphoto();
    userphoto_ = userphoto;
  } else {
    clear_has_userphoto();
    userphoto_ = const_cast< ::std::string*>(&::google::protobuf::internal::kEmptyString);
  }
}

// optional string nickName = 4;
inline bool GroupMessageInfo::has_nickname() const {
  return (_has_bits_[0] & 0x00000008u) != 0;
}
inline void GroupMessageInfo::set_has_nickname() {
  _has_bits_[0] |= 0x00000008u;
}
inline void GroupMessageInfo::clear_has_nickname() {
  _has_bits_[0] &= ~0x00000008u;
}
inline void GroupMessageInfo::clear_nickname() {
  if (nickname_ != &::google::protobuf::internal::kEmptyString) {
    nickname_->clear();
  }
  clear_has_nickname();
}
inline const ::std::string& GroupMessageInfo::nickname() const {
  return *nickname_;
}
inline void GroupMessageInfo::set_nickname(const ::std::string& value) {
  set_has_nickname();
  if (nickname_ == &::google::protobuf::internal::kEmptyString) {
    nickname_ = new ::std::string;
  }
  nickname_->assign(value);
}
inline void GroupMessageInfo::set_nickname(const char* value) {
  set_has_nickname();
  if (nickname_ == &::google::protobuf::internal::kEmptyString) {
    nickname_ = new ::std::string;
  }
  nickname_->assign(value);
}
inline void GroupMessageInfo::set_nickname(const char* value, size_t size) {
  set_has_nickname();
  if (nickname_ == &::google::protobuf::internal::kEmptyString) {
    nickname_ = new ::std::string;
  }
  nickname_->assign(reinterpret_cast<const char*>(value), size);
}
inline ::std::string* GroupMessageInfo::mutable_nickname() {
  set_has_nickname();
  if (nickname_ == &::google::protobuf::internal::kEmptyString) {
    nickname_ = new ::std::string;
  }
  return nickname_;
}
inline ::std::string* GroupMessageInfo::release_nickname() {
  clear_has_nickname();
  if (nickname_ == &::google::protobuf::internal::kEmptyString) {
    return NULL;
  } else {
    ::std::string* temp = nickname_;
    nickname_ = const_cast< ::std::string*>(&::google::protobuf::internal::kEmptyString);
    return temp;
  }
}
inline void GroupMessageInfo::set_allocated_nickname(::std::string* nickname) {
  if (nickname_ != &::google::protobuf::internal::kEmptyString) {
    delete nickname_;
  }
  if (nickname) {
    set_has_nickname();
    nickname_ = nickname;
  } else {
    clear_has_nickname();
    nickname_ = const_cast< ::std::string*>(&::google::protobuf::internal::kEmptyString);
  }
}

// required bytes content = 5;
inline bool GroupMessageInfo::has_content() const {
  return (_has_bits_[0] & 0x00000010u) != 0;
}
inline void GroupMessageInfo::set_has_content() {
  _has_bits_[0] |= 0x00000010u;
}
inline void GroupMessageInfo::clear_has_content() {
  _has_bits_[0] &= ~0x00000010u;
}
inline void GroupMessageInfo::clear_content() {
  if (content_ != &::google::protobuf::internal::kEmptyString) {
    content_->clear();
  }
  clear_has_content();
}
inline const ::std::string& GroupMessageInfo::content() const {
  return *content_;
}
inline void GroupMessageInfo::set_content(const ::std::string& value) {
  set_has_content();
  if (content_ == &::google::protobuf::internal::kEmptyString) {
    content_ = new ::std::string;
  }
  content_->assign(value);
}
inline void GroupMessageInfo::set_content(const char* value) {
  set_has_content();
  if (content_ == &::google::protobuf::internal::kEmptyString) {
    content_ = new ::std::string;
  }
  content_->assign(value);
}
inline void GroupMessageInfo::set_content(const void* value, size_t size) {
  set_has_content();
  if (content_ == &::google::protobuf::internal::kEmptyString) {
    content_ = new ::std::string;
  }
  content_->assign(reinterpret_cast<const char*>(value), size);
}
inline ::std::string* GroupMessageInfo::mutable_content() {
  set_has_content();
  if (content_ == &::google::protobuf::internal::kEmptyString) {
    content_ = new ::std::string;
  }
  return content_;
}
inline ::std::string* GroupMessageInfo::release_content() {
  clear_has_content();
  if (content_ == &::google::protobuf::internal::kEmptyString) {
    return NULL;
  } else {
    ::std::string* temp = content_;
    content_ = const_cast< ::std::string*>(&::google::protobuf::internal::kEmptyString);
    return temp;
  }
}
inline void GroupMessageInfo::set_allocated_content(::std::string* content) {
  if (content_ != &::google::protobuf::internal::kEmptyString) {
    delete content_;
  }
  if (content) {
    set_has_content();
    content_ = content;
  } else {
    clear_has_content();
    content_ = const_cast< ::std::string*>(&::google::protobuf::internal::kEmptyString);
  }
}

// required int64 created = 6;
inline bool GroupMessageInfo::has_created() const {
  return (_has_bits_[0] & 0x00000020u) != 0;
}
inline void GroupMessageInfo::set_has_created() {
  _has_bits_[0] |= 0x00000020u;
}
inline void GroupMessageInfo::clear_has_created() {
  _has_bits_[0] &= ~0x00000020u;
}
inline void GroupMessageInfo::clear_created() {
  created_ = GOOGLE_LONGLONG(0);
  clear_has_created();
}
inline ::google::protobuf::int64 GroupMessageInfo::created() const {
  return created_;
}
inline void GroupMessageInfo::set_created(::google::protobuf::int64 value) {
  set_has_created();
  created_ = value;
}


// @@protoc_insertion_point(namespace_scope)

}  // namespace protobuf
}  // namespace im
}  // namespace huizhi
}  // namespace com

#ifndef SWIG
namespace google {
namespace protobuf {


}  // namespace google
}  // namespace protobuf
#endif  // SWIG

// @@protoc_insertion_point(global_scope)

#endif  // PROTOBUF_GroupMessageBuf_2eproto__INCLUDED
