// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: UnReadMessageInfoBuf.proto

#define INTERNAL_SUPPRESS_PROTOBUF_FIELD_DEPRECATION
#include "UnReadMessageInfoBuf.pb.h"

#include <algorithm>

#include <google/protobuf/stubs/common.h>
#include <google/protobuf/stubs/once.h>
#include <google/protobuf/io/coded_stream.h>
#include <google/protobuf/wire_format_lite_inl.h>
#include <google/protobuf/descriptor.h>
#include <google/protobuf/generated_message_reflection.h>
#include <google/protobuf/reflection_ops.h>
#include <google/protobuf/wire_format.h>
// @@protoc_insertion_point(includes)

namespace com {
namespace huizhi {
namespace im {
namespace protobuf {

namespace {

const ::google::protobuf::Descriptor* UnReadMessageInfo_descriptor_ = NULL;
const ::google::protobuf::internal::GeneratedMessageReflection*
  UnReadMessageInfo_reflection_ = NULL;
const ::google::protobuf::Descriptor* UnReadMessage_descriptor_ = NULL;
const ::google::protobuf::internal::GeneratedMessageReflection*
  UnReadMessage_reflection_ = NULL;

}  // namespace


void protobuf_AssignDesc_UnReadMessageInfoBuf_2eproto() {
  protobuf_AddDesc_UnReadMessageInfoBuf_2eproto();
  const ::google::protobuf::FileDescriptor* file =
    ::google::protobuf::DescriptorPool::generated_pool()->FindFileByName(
      "UnReadMessageInfoBuf.proto");
  GOOGLE_CHECK(file != NULL);
  UnReadMessageInfo_descriptor_ = file->message_type(0);
  static const int UnReadMessageInfo_offsets_[5] = {
    GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(UnReadMessageInfo, fromuserid_),
    GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(UnReadMessageInfo, fromuserphoto_),
    GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(UnReadMessageInfo, fromnickname_),
    GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(UnReadMessageInfo, touserid_),
    GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(UnReadMessageInfo, messages_),
  };
  UnReadMessageInfo_reflection_ =
    new ::google::protobuf::internal::GeneratedMessageReflection(
      UnReadMessageInfo_descriptor_,
      UnReadMessageInfo::default_instance_,
      UnReadMessageInfo_offsets_,
      GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(UnReadMessageInfo, _has_bits_[0]),
      GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(UnReadMessageInfo, _unknown_fields_),
      -1,
      ::google::protobuf::DescriptorPool::generated_pool(),
      ::google::protobuf::MessageFactory::generated_factory(),
      sizeof(UnReadMessageInfo));
  UnReadMessage_descriptor_ = file->message_type(1);
  static const int UnReadMessage_offsets_[3] = {
    GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(UnReadMessage, type_),
    GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(UnReadMessage, content_),
    GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(UnReadMessage, created_),
  };
  UnReadMessage_reflection_ =
    new ::google::protobuf::internal::GeneratedMessageReflection(
      UnReadMessage_descriptor_,
      UnReadMessage::default_instance_,
      UnReadMessage_offsets_,
      GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(UnReadMessage, _has_bits_[0]),
      GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(UnReadMessage, _unknown_fields_),
      -1,
      ::google::protobuf::DescriptorPool::generated_pool(),
      ::google::protobuf::MessageFactory::generated_factory(),
      sizeof(UnReadMessage));
}

namespace {

GOOGLE_PROTOBUF_DECLARE_ONCE(protobuf_AssignDescriptors_once_);
inline void protobuf_AssignDescriptorsOnce() {
  ::google::protobuf::GoogleOnceInit(&protobuf_AssignDescriptors_once_,
                 &protobuf_AssignDesc_UnReadMessageInfoBuf_2eproto);
}

void protobuf_RegisterTypes(const ::std::string&) {
  protobuf_AssignDescriptorsOnce();
  ::google::protobuf::MessageFactory::InternalRegisterGeneratedMessage(
    UnReadMessageInfo_descriptor_, &UnReadMessageInfo::default_instance());
  ::google::protobuf::MessageFactory::InternalRegisterGeneratedMessage(
    UnReadMessage_descriptor_, &UnReadMessage::default_instance());
}

}  // namespace

void protobuf_ShutdownFile_UnReadMessageInfoBuf_2eproto() {
  delete UnReadMessageInfo::default_instance_;
  delete UnReadMessageInfo_reflection_;
  delete UnReadMessage::default_instance_;
  delete UnReadMessage_reflection_;
}

void protobuf_AddDesc_UnReadMessageInfoBuf_2eproto() {
  static bool already_here = false;
  if (already_here) return;
  already_here = true;
  GOOGLE_PROTOBUF_VERIFY_VERSION;

  ::google::protobuf::DescriptorPool::InternalAddGeneratedFile(
    "\n\032UnReadMessageInfoBuf.proto\022\026com.huizhi"
    ".im.protobuf\"\237\001\n\021UnReadMessageInfo\022\022\n\nfr"
    "omUserId\030\001 \002(\005\022\025\n\rfromUserPhoto\030\002 \001(\t\022\024\n"
    "\014fromNickName\030\003 \001(\t\022\020\n\010toUserId\030\004 \002(\005\0227\n"
    "\010messages\030\005 \003(\0132%.com.huizhi.im.protobuf"
    ".UnReadMessage\"\?\n\rUnReadMessage\022\014\n\004type\030"
    "\001 \002(\005\022\017\n\007content\030\002 \002(\014\022\017\n\007created\030\003 \002(\003B"
    "\026B\024UnReadMessageInfoBuf", 303);
  ::google::protobuf::MessageFactory::InternalRegisterGeneratedFile(
    "UnReadMessageInfoBuf.proto", &protobuf_RegisterTypes);
  UnReadMessageInfo::default_instance_ = new UnReadMessageInfo();
  UnReadMessage::default_instance_ = new UnReadMessage();
  UnReadMessageInfo::default_instance_->InitAsDefaultInstance();
  UnReadMessage::default_instance_->InitAsDefaultInstance();
  ::google::protobuf::internal::OnShutdown(&protobuf_ShutdownFile_UnReadMessageInfoBuf_2eproto);
}

// Force AddDescriptors() to be called at static initialization time.
struct StaticDescriptorInitializer_UnReadMessageInfoBuf_2eproto {
  StaticDescriptorInitializer_UnReadMessageInfoBuf_2eproto() {
    protobuf_AddDesc_UnReadMessageInfoBuf_2eproto();
  }
} static_descriptor_initializer_UnReadMessageInfoBuf_2eproto_;

// ===================================================================

#ifndef _MSC_VER
const int UnReadMessageInfo::kFromUserIdFieldNumber;
const int UnReadMessageInfo::kFromUserPhotoFieldNumber;
const int UnReadMessageInfo::kFromNickNameFieldNumber;
const int UnReadMessageInfo::kToUserIdFieldNumber;
const int UnReadMessageInfo::kMessagesFieldNumber;
#endif  // !_MSC_VER

UnReadMessageInfo::UnReadMessageInfo()
  : ::google::protobuf::Message() {
  SharedCtor();
}

void UnReadMessageInfo::InitAsDefaultInstance() {
}

UnReadMessageInfo::UnReadMessageInfo(const UnReadMessageInfo& from)
  : ::google::protobuf::Message() {
  SharedCtor();
  MergeFrom(from);
}

void UnReadMessageInfo::SharedCtor() {
  _cached_size_ = 0;
  fromuserid_ = 0;
  fromuserphoto_ = const_cast< ::std::string*>(&::google::protobuf::internal::kEmptyString);
  fromnickname_ = const_cast< ::std::string*>(&::google::protobuf::internal::kEmptyString);
  touserid_ = 0;
  ::memset(_has_bits_, 0, sizeof(_has_bits_));
}

UnReadMessageInfo::~UnReadMessageInfo() {
  SharedDtor();
}

void UnReadMessageInfo::SharedDtor() {
  if (fromuserphoto_ != &::google::protobuf::internal::kEmptyString) {
    delete fromuserphoto_;
  }
  if (fromnickname_ != &::google::protobuf::internal::kEmptyString) {
    delete fromnickname_;
  }
  if (this != default_instance_) {
  }
}

void UnReadMessageInfo::SetCachedSize(int size) const {
  GOOGLE_SAFE_CONCURRENT_WRITES_BEGIN();
  _cached_size_ = size;
  GOOGLE_SAFE_CONCURRENT_WRITES_END();
}
const ::google::protobuf::Descriptor* UnReadMessageInfo::descriptor() {
  protobuf_AssignDescriptorsOnce();
  return UnReadMessageInfo_descriptor_;
}

const UnReadMessageInfo& UnReadMessageInfo::default_instance() {
  if (default_instance_ == NULL) protobuf_AddDesc_UnReadMessageInfoBuf_2eproto();
  return *default_instance_;
}

UnReadMessageInfo* UnReadMessageInfo::default_instance_ = NULL;

UnReadMessageInfo* UnReadMessageInfo::New() const {
  return new UnReadMessageInfo;
}

void UnReadMessageInfo::Clear() {
  if (_has_bits_[0 / 32] & (0xffu << (0 % 32))) {
    fromuserid_ = 0;
    if (has_fromuserphoto()) {
      if (fromuserphoto_ != &::google::protobuf::internal::kEmptyString) {
        fromuserphoto_->clear();
      }
    }
    if (has_fromnickname()) {
      if (fromnickname_ != &::google::protobuf::internal::kEmptyString) {
        fromnickname_->clear();
      }
    }
    touserid_ = 0;
  }
  messages_.Clear();
  ::memset(_has_bits_, 0, sizeof(_has_bits_));
  mutable_unknown_fields()->Clear();
}

bool UnReadMessageInfo::MergePartialFromCodedStream(
    ::google::protobuf::io::CodedInputStream* input) {
#define DO_(EXPRESSION) if (!(EXPRESSION)) return false
  ::google::protobuf::uint32 tag;
  while ((tag = input->ReadTag()) != 0) {
    switch (::google::protobuf::internal::WireFormatLite::GetTagFieldNumber(tag)) {
      // required int32 fromUserId = 1;
      case 1: {
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_VARINT) {
          DO_((::google::protobuf::internal::WireFormatLite::ReadPrimitive<
                   ::google::protobuf::int32, ::google::protobuf::internal::WireFormatLite::TYPE_INT32>(
                 input, &fromuserid_)));
          set_has_fromuserid();
        } else {
          goto handle_uninterpreted;
        }
        if (input->ExpectTag(18)) goto parse_fromUserPhoto;
        break;
      }

      // optional string fromUserPhoto = 2;
      case 2: {
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_LENGTH_DELIMITED) {
         parse_fromUserPhoto:
          DO_(::google::protobuf::internal::WireFormatLite::ReadString(
                input, this->mutable_fromuserphoto()));
          ::google::protobuf::internal::WireFormat::VerifyUTF8String(
            this->fromuserphoto().data(), this->fromuserphoto().length(),
            ::google::protobuf::internal::WireFormat::PARSE);
        } else {
          goto handle_uninterpreted;
        }
        if (input->ExpectTag(26)) goto parse_fromNickName;
        break;
      }

      // optional string fromNickName = 3;
      case 3: {
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_LENGTH_DELIMITED) {
         parse_fromNickName:
          DO_(::google::protobuf::internal::WireFormatLite::ReadString(
                input, this->mutable_fromnickname()));
          ::google::protobuf::internal::WireFormat::VerifyUTF8String(
            this->fromnickname().data(), this->fromnickname().length(),
            ::google::protobuf::internal::WireFormat::PARSE);
        } else {
          goto handle_uninterpreted;
        }
        if (input->ExpectTag(32)) goto parse_toUserId;
        break;
      }

      // required int32 toUserId = 4;
      case 4: {
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_VARINT) {
         parse_toUserId:
          DO_((::google::protobuf::internal::WireFormatLite::ReadPrimitive<
                   ::google::protobuf::int32, ::google::protobuf::internal::WireFormatLite::TYPE_INT32>(
                 input, &touserid_)));
          set_has_touserid();
        } else {
          goto handle_uninterpreted;
        }
        if (input->ExpectTag(42)) goto parse_messages;
        break;
      }

      // repeated .com.huizhi.im.protobuf.UnReadMessage messages = 5;
      case 5: {
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_LENGTH_DELIMITED) {
         parse_messages:
          DO_(::google::protobuf::internal::WireFormatLite::ReadMessageNoVirtual(
                input, add_messages()));
        } else {
          goto handle_uninterpreted;
        }
        if (input->ExpectTag(42)) goto parse_messages;
        if (input->ExpectAtEnd()) return true;
        break;
      }

      default: {
      handle_uninterpreted:
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_END_GROUP) {
          return true;
        }
        DO_(::google::protobuf::internal::WireFormat::SkipField(
              input, tag, mutable_unknown_fields()));
        break;
      }
    }
  }
  return true;
#undef DO_
}

void UnReadMessageInfo::SerializeWithCachedSizes(
    ::google::protobuf::io::CodedOutputStream* output) const {
  // required int32 fromUserId = 1;
  if (has_fromuserid()) {
    ::google::protobuf::internal::WireFormatLite::WriteInt32(1, this->fromuserid(), output);
  }

  // optional string fromUserPhoto = 2;
  if (has_fromuserphoto()) {
    ::google::protobuf::internal::WireFormat::VerifyUTF8String(
      this->fromuserphoto().data(), this->fromuserphoto().length(),
      ::google::protobuf::internal::WireFormat::SERIALIZE);
    ::google::protobuf::internal::WireFormatLite::WriteString(
      2, this->fromuserphoto(), output);
  }

  // optional string fromNickName = 3;
  if (has_fromnickname()) {
    ::google::protobuf::internal::WireFormat::VerifyUTF8String(
      this->fromnickname().data(), this->fromnickname().length(),
      ::google::protobuf::internal::WireFormat::SERIALIZE);
    ::google::protobuf::internal::WireFormatLite::WriteString(
      3, this->fromnickname(), output);
  }

  // required int32 toUserId = 4;
  if (has_touserid()) {
    ::google::protobuf::internal::WireFormatLite::WriteInt32(4, this->touserid(), output);
  }

  // repeated .com.huizhi.im.protobuf.UnReadMessage messages = 5;
  for (int i = 0; i < this->messages_size(); i++) {
    ::google::protobuf::internal::WireFormatLite::WriteMessageMaybeToArray(
      5, this->messages(i), output);
  }

  if (!unknown_fields().empty()) {
    ::google::protobuf::internal::WireFormat::SerializeUnknownFields(
        unknown_fields(), output);
  }
}

::google::protobuf::uint8* UnReadMessageInfo::SerializeWithCachedSizesToArray(
    ::google::protobuf::uint8* target) const {
  // required int32 fromUserId = 1;
  if (has_fromuserid()) {
    target = ::google::protobuf::internal::WireFormatLite::WriteInt32ToArray(1, this->fromuserid(), target);
  }

  // optional string fromUserPhoto = 2;
  if (has_fromuserphoto()) {
    ::google::protobuf::internal::WireFormat::VerifyUTF8String(
      this->fromuserphoto().data(), this->fromuserphoto().length(),
      ::google::protobuf::internal::WireFormat::SERIALIZE);
    target =
      ::google::protobuf::internal::WireFormatLite::WriteStringToArray(
        2, this->fromuserphoto(), target);
  }

  // optional string fromNickName = 3;
  if (has_fromnickname()) {
    ::google::protobuf::internal::WireFormat::VerifyUTF8String(
      this->fromnickname().data(), this->fromnickname().length(),
      ::google::protobuf::internal::WireFormat::SERIALIZE);
    target =
      ::google::protobuf::internal::WireFormatLite::WriteStringToArray(
        3, this->fromnickname(), target);
  }

  // required int32 toUserId = 4;
  if (has_touserid()) {
    target = ::google::protobuf::internal::WireFormatLite::WriteInt32ToArray(4, this->touserid(), target);
  }

  // repeated .com.huizhi.im.protobuf.UnReadMessage messages = 5;
  for (int i = 0; i < this->messages_size(); i++) {
    target = ::google::protobuf::internal::WireFormatLite::
      WriteMessageNoVirtualToArray(
        5, this->messages(i), target);
  }

  if (!unknown_fields().empty()) {
    target = ::google::protobuf::internal::WireFormat::SerializeUnknownFieldsToArray(
        unknown_fields(), target);
  }
  return target;
}

int UnReadMessageInfo::ByteSize() const {
  int total_size = 0;

  if (_has_bits_[0 / 32] & (0xffu << (0 % 32))) {
    // required int32 fromUserId = 1;
    if (has_fromuserid()) {
      total_size += 1 +
        ::google::protobuf::internal::WireFormatLite::Int32Size(
          this->fromuserid());
    }

    // optional string fromUserPhoto = 2;
    if (has_fromuserphoto()) {
      total_size += 1 +
        ::google::protobuf::internal::WireFormatLite::StringSize(
          this->fromuserphoto());
    }

    // optional string fromNickName = 3;
    if (has_fromnickname()) {
      total_size += 1 +
        ::google::protobuf::internal::WireFormatLite::StringSize(
          this->fromnickname());
    }

    // required int32 toUserId = 4;
    if (has_touserid()) {
      total_size += 1 +
        ::google::protobuf::internal::WireFormatLite::Int32Size(
          this->touserid());
    }

  }
  // repeated .com.huizhi.im.protobuf.UnReadMessage messages = 5;
  total_size += 1 * this->messages_size();
  for (int i = 0; i < this->messages_size(); i++) {
    total_size +=
      ::google::protobuf::internal::WireFormatLite::MessageSizeNoVirtual(
        this->messages(i));
  }

  if (!unknown_fields().empty()) {
    total_size +=
      ::google::protobuf::internal::WireFormat::ComputeUnknownFieldsSize(
        unknown_fields());
  }
  GOOGLE_SAFE_CONCURRENT_WRITES_BEGIN();
  _cached_size_ = total_size;
  GOOGLE_SAFE_CONCURRENT_WRITES_END();
  return total_size;
}

void UnReadMessageInfo::MergeFrom(const ::google::protobuf::Message& from) {
  GOOGLE_CHECK_NE(&from, this);
  const UnReadMessageInfo* source =
    ::google::protobuf::internal::dynamic_cast_if_available<const UnReadMessageInfo*>(
      &from);
  if (source == NULL) {
    ::google::protobuf::internal::ReflectionOps::Merge(from, this);
  } else {
    MergeFrom(*source);
  }
}

void UnReadMessageInfo::MergeFrom(const UnReadMessageInfo& from) {
  GOOGLE_CHECK_NE(&from, this);
  messages_.MergeFrom(from.messages_);
  if (from._has_bits_[0 / 32] & (0xffu << (0 % 32))) {
    if (from.has_fromuserid()) {
      set_fromuserid(from.fromuserid());
    }
    if (from.has_fromuserphoto()) {
      set_fromuserphoto(from.fromuserphoto());
    }
    if (from.has_fromnickname()) {
      set_fromnickname(from.fromnickname());
    }
    if (from.has_touserid()) {
      set_touserid(from.touserid());
    }
  }
  mutable_unknown_fields()->MergeFrom(from.unknown_fields());
}

void UnReadMessageInfo::CopyFrom(const ::google::protobuf::Message& from) {
  if (&from == this) return;
  Clear();
  MergeFrom(from);
}

void UnReadMessageInfo::CopyFrom(const UnReadMessageInfo& from) {
  if (&from == this) return;
  Clear();
  MergeFrom(from);
}

bool UnReadMessageInfo::IsInitialized() const {
  if ((_has_bits_[0] & 0x00000009) != 0x00000009) return false;

  for (int i = 0; i < messages_size(); i++) {
    if (!this->messages(i).IsInitialized()) return false;
  }
  return true;
}

void UnReadMessageInfo::Swap(UnReadMessageInfo* other) {
  if (other != this) {
    std::swap(fromuserid_, other->fromuserid_);
    std::swap(fromuserphoto_, other->fromuserphoto_);
    std::swap(fromnickname_, other->fromnickname_);
    std::swap(touserid_, other->touserid_);
    messages_.Swap(&other->messages_);
    std::swap(_has_bits_[0], other->_has_bits_[0]);
    _unknown_fields_.Swap(&other->_unknown_fields_);
    std::swap(_cached_size_, other->_cached_size_);
  }
}

::google::protobuf::Metadata UnReadMessageInfo::GetMetadata() const {
  protobuf_AssignDescriptorsOnce();
  ::google::protobuf::Metadata metadata;
  metadata.descriptor = UnReadMessageInfo_descriptor_;
  metadata.reflection = UnReadMessageInfo_reflection_;
  return metadata;
}


// ===================================================================

#ifndef _MSC_VER
const int UnReadMessage::kTypeFieldNumber;
const int UnReadMessage::kContentFieldNumber;
const int UnReadMessage::kCreatedFieldNumber;
#endif  // !_MSC_VER

UnReadMessage::UnReadMessage()
  : ::google::protobuf::Message() {
  SharedCtor();
}

void UnReadMessage::InitAsDefaultInstance() {
}

UnReadMessage::UnReadMessage(const UnReadMessage& from)
  : ::google::protobuf::Message() {
  SharedCtor();
  MergeFrom(from);
}

void UnReadMessage::SharedCtor() {
  _cached_size_ = 0;
  type_ = 0;
  content_ = const_cast< ::std::string*>(&::google::protobuf::internal::kEmptyString);
  created_ = GOOGLE_LONGLONG(0);
  ::memset(_has_bits_, 0, sizeof(_has_bits_));
}

UnReadMessage::~UnReadMessage() {
  SharedDtor();
}

void UnReadMessage::SharedDtor() {
  if (content_ != &::google::protobuf::internal::kEmptyString) {
    delete content_;
  }
  if (this != default_instance_) {
  }
}

void UnReadMessage::SetCachedSize(int size) const {
  GOOGLE_SAFE_CONCURRENT_WRITES_BEGIN();
  _cached_size_ = size;
  GOOGLE_SAFE_CONCURRENT_WRITES_END();
}
const ::google::protobuf::Descriptor* UnReadMessage::descriptor() {
  protobuf_AssignDescriptorsOnce();
  return UnReadMessage_descriptor_;
}

const UnReadMessage& UnReadMessage::default_instance() {
  if (default_instance_ == NULL) protobuf_AddDesc_UnReadMessageInfoBuf_2eproto();
  return *default_instance_;
}

UnReadMessage* UnReadMessage::default_instance_ = NULL;

UnReadMessage* UnReadMessage::New() const {
  return new UnReadMessage;
}

void UnReadMessage::Clear() {
  if (_has_bits_[0 / 32] & (0xffu << (0 % 32))) {
    type_ = 0;
    if (has_content()) {
      if (content_ != &::google::protobuf::internal::kEmptyString) {
        content_->clear();
      }
    }
    created_ = GOOGLE_LONGLONG(0);
  }
  ::memset(_has_bits_, 0, sizeof(_has_bits_));
  mutable_unknown_fields()->Clear();
}

bool UnReadMessage::MergePartialFromCodedStream(
    ::google::protobuf::io::CodedInputStream* input) {
#define DO_(EXPRESSION) if (!(EXPRESSION)) return false
  ::google::protobuf::uint32 tag;
  while ((tag = input->ReadTag()) != 0) {
    switch (::google::protobuf::internal::WireFormatLite::GetTagFieldNumber(tag)) {
      // required int32 type = 1;
      case 1: {
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_VARINT) {
          DO_((::google::protobuf::internal::WireFormatLite::ReadPrimitive<
                   ::google::protobuf::int32, ::google::protobuf::internal::WireFormatLite::TYPE_INT32>(
                 input, &type_)));
          set_has_type();
        } else {
          goto handle_uninterpreted;
        }
        if (input->ExpectTag(18)) goto parse_content;
        break;
      }

      // required bytes content = 2;
      case 2: {
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_LENGTH_DELIMITED) {
         parse_content:
          DO_(::google::protobuf::internal::WireFormatLite::ReadBytes(
                input, this->mutable_content()));
        } else {
          goto handle_uninterpreted;
        }
        if (input->ExpectTag(24)) goto parse_created;
        break;
      }

      // required int64 created = 3;
      case 3: {
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_VARINT) {
         parse_created:
          DO_((::google::protobuf::internal::WireFormatLite::ReadPrimitive<
                   ::google::protobuf::int64, ::google::protobuf::internal::WireFormatLite::TYPE_INT64>(
                 input, &created_)));
          set_has_created();
        } else {
          goto handle_uninterpreted;
        }
        if (input->ExpectAtEnd()) return true;
        break;
      }

      default: {
      handle_uninterpreted:
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_END_GROUP) {
          return true;
        }
        DO_(::google::protobuf::internal::WireFormat::SkipField(
              input, tag, mutable_unknown_fields()));
        break;
      }
    }
  }
  return true;
#undef DO_
}

void UnReadMessage::SerializeWithCachedSizes(
    ::google::protobuf::io::CodedOutputStream* output) const {
  // required int32 type = 1;
  if (has_type()) {
    ::google::protobuf::internal::WireFormatLite::WriteInt32(1, this->type(), output);
  }

  // required bytes content = 2;
  if (has_content()) {
    ::google::protobuf::internal::WireFormatLite::WriteBytes(
      2, this->content(), output);
  }

  // required int64 created = 3;
  if (has_created()) {
    ::google::protobuf::internal::WireFormatLite::WriteInt64(3, this->created(), output);
  }

  if (!unknown_fields().empty()) {
    ::google::protobuf::internal::WireFormat::SerializeUnknownFields(
        unknown_fields(), output);
  }
}

::google::protobuf::uint8* UnReadMessage::SerializeWithCachedSizesToArray(
    ::google::protobuf::uint8* target) const {
  // required int32 type = 1;
  if (has_type()) {
    target = ::google::protobuf::internal::WireFormatLite::WriteInt32ToArray(1, this->type(), target);
  }

  // required bytes content = 2;
  if (has_content()) {
    target =
      ::google::protobuf::internal::WireFormatLite::WriteBytesToArray(
        2, this->content(), target);
  }

  // required int64 created = 3;
  if (has_created()) {
    target = ::google::protobuf::internal::WireFormatLite::WriteInt64ToArray(3, this->created(), target);
  }

  if (!unknown_fields().empty()) {
    target = ::google::protobuf::internal::WireFormat::SerializeUnknownFieldsToArray(
        unknown_fields(), target);
  }
  return target;
}

int UnReadMessage::ByteSize() const {
  int total_size = 0;

  if (_has_bits_[0 / 32] & (0xffu << (0 % 32))) {
    // required int32 type = 1;
    if (has_type()) {
      total_size += 1 +
        ::google::protobuf::internal::WireFormatLite::Int32Size(
          this->type());
    }

    // required bytes content = 2;
    if (has_content()) {
      total_size += 1 +
        ::google::protobuf::internal::WireFormatLite::BytesSize(
          this->content());
    }

    // required int64 created = 3;
    if (has_created()) {
      total_size += 1 +
        ::google::protobuf::internal::WireFormatLite::Int64Size(
          this->created());
    }

  }
  if (!unknown_fields().empty()) {
    total_size +=
      ::google::protobuf::internal::WireFormat::ComputeUnknownFieldsSize(
        unknown_fields());
  }
  GOOGLE_SAFE_CONCURRENT_WRITES_BEGIN();
  _cached_size_ = total_size;
  GOOGLE_SAFE_CONCURRENT_WRITES_END();
  return total_size;
}

void UnReadMessage::MergeFrom(const ::google::protobuf::Message& from) {
  GOOGLE_CHECK_NE(&from, this);
  const UnReadMessage* source =
    ::google::protobuf::internal::dynamic_cast_if_available<const UnReadMessage*>(
      &from);
  if (source == NULL) {
    ::google::protobuf::internal::ReflectionOps::Merge(from, this);
  } else {
    MergeFrom(*source);
  }
}

void UnReadMessage::MergeFrom(const UnReadMessage& from) {
  GOOGLE_CHECK_NE(&from, this);
  if (from._has_bits_[0 / 32] & (0xffu << (0 % 32))) {
    if (from.has_type()) {
      set_type(from.type());
    }
    if (from.has_content()) {
      set_content(from.content());
    }
    if (from.has_created()) {
      set_created(from.created());
    }
  }
  mutable_unknown_fields()->MergeFrom(from.unknown_fields());
}

void UnReadMessage::CopyFrom(const ::google::protobuf::Message& from) {
  if (&from == this) return;
  Clear();
  MergeFrom(from);
}

void UnReadMessage::CopyFrom(const UnReadMessage& from) {
  if (&from == this) return;
  Clear();
  MergeFrom(from);
}

bool UnReadMessage::IsInitialized() const {
  if ((_has_bits_[0] & 0x00000007) != 0x00000007) return false;

  return true;
}

void UnReadMessage::Swap(UnReadMessage* other) {
  if (other != this) {
    std::swap(type_, other->type_);
    std::swap(content_, other->content_);
    std::swap(created_, other->created_);
    std::swap(_has_bits_[0], other->_has_bits_[0]);
    _unknown_fields_.Swap(&other->_unknown_fields_);
    std::swap(_cached_size_, other->_cached_size_);
  }
}

::google::protobuf::Metadata UnReadMessage::GetMetadata() const {
  protobuf_AssignDescriptorsOnce();
  ::google::protobuf::Metadata metadata;
  metadata.descriptor = UnReadMessage_descriptor_;
  metadata.reflection = UnReadMessage_reflection_;
  return metadata;
}


// @@protoc_insertion_point(namespace_scope)

}  // namespace protobuf
}  // namespace im
}  // namespace huizhi
}  // namespace com

// @@protoc_insertion_point(global_scope)
