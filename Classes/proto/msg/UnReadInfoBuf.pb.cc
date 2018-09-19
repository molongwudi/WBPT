// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: UnReadInfoBuf.proto

#define INTERNAL_SUPPRESS_PROTOBUF_FIELD_DEPRECATION
#include "UnReadInfoBuf.pb.h"

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

const ::google::protobuf::Descriptor* UnReadInfo_descriptor_ = NULL;
const ::google::protobuf::internal::GeneratedMessageReflection*
  UnReadInfo_reflection_ = NULL;
const ::google::protobuf::Descriptor* Counter_descriptor_ = NULL;
const ::google::protobuf::internal::GeneratedMessageReflection*
  Counter_reflection_ = NULL;

}  // namespace


void protobuf_AssignDesc_UnReadInfoBuf_2eproto() {
  protobuf_AddDesc_UnReadInfoBuf_2eproto();
  const ::google::protobuf::FileDescriptor* file =
    ::google::protobuf::DescriptorPool::generated_pool()->FindFileByName(
      "UnReadInfoBuf.proto");
  GOOGLE_CHECK(file != NULL);
  UnReadInfo_descriptor_ = file->message_type(0);
  static const int UnReadInfo_offsets_[2] = {
    GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(UnReadInfo, unreadsize_),
    GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(UnReadInfo, uids_),
  };
  UnReadInfo_reflection_ =
    new ::google::protobuf::internal::GeneratedMessageReflection(
      UnReadInfo_descriptor_,
      UnReadInfo::default_instance_,
      UnReadInfo_offsets_,
      GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(UnReadInfo, _has_bits_[0]),
      GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(UnReadInfo, _unknown_fields_),
      -1,
      ::google::protobuf::DescriptorPool::generated_pool(),
      ::google::protobuf::MessageFactory::generated_factory(),
      sizeof(UnReadInfo));
  Counter_descriptor_ = file->message_type(1);
  static const int Counter_offsets_[2] = {
    GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(Counter, uid_),
    GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(Counter, count_),
  };
  Counter_reflection_ =
    new ::google::protobuf::internal::GeneratedMessageReflection(
      Counter_descriptor_,
      Counter::default_instance_,
      Counter_offsets_,
      GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(Counter, _has_bits_[0]),
      GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(Counter, _unknown_fields_),
      -1,
      ::google::protobuf::DescriptorPool::generated_pool(),
      ::google::protobuf::MessageFactory::generated_factory(),
      sizeof(Counter));
}

namespace {

GOOGLE_PROTOBUF_DECLARE_ONCE(protobuf_AssignDescriptors_once_);
inline void protobuf_AssignDescriptorsOnce() {
  ::google::protobuf::GoogleOnceInit(&protobuf_AssignDescriptors_once_,
                 &protobuf_AssignDesc_UnReadInfoBuf_2eproto);
}

void protobuf_RegisterTypes(const ::std::string&) {
  protobuf_AssignDescriptorsOnce();
  ::google::protobuf::MessageFactory::InternalRegisterGeneratedMessage(
    UnReadInfo_descriptor_, &UnReadInfo::default_instance());
  ::google::protobuf::MessageFactory::InternalRegisterGeneratedMessage(
    Counter_descriptor_, &Counter::default_instance());
}

}  // namespace

void protobuf_ShutdownFile_UnReadInfoBuf_2eproto() {
  delete UnReadInfo::default_instance_;
  delete UnReadInfo_reflection_;
  delete Counter::default_instance_;
  delete Counter_reflection_;
}

void protobuf_AddDesc_UnReadInfoBuf_2eproto() {
  static bool already_here = false;
  if (already_here) return;
  already_here = true;
  GOOGLE_PROTOBUF_VERIFY_VERSION;

  ::google::protobuf::DescriptorPool::InternalAddGeneratedFile(
    "\n\023UnReadInfoBuf.proto\022\026com.huizhi.im.pro"
    "tobuf\"O\n\nUnReadInfo\022\022\n\nunReadSize\030\001 \002(\005\022"
    "-\n\004uids\030\002 \003(\0132\037.com.huizhi.im.protobuf.C"
    "ounter\"%\n\007Counter\022\013\n\003uid\030\001 \002(\005\022\r\n\005count\030"
    "\002 \002(\005B\017B\rUnReadInfoBuf", 182);
  ::google::protobuf::MessageFactory::InternalRegisterGeneratedFile(
    "UnReadInfoBuf.proto", &protobuf_RegisterTypes);
  UnReadInfo::default_instance_ = new UnReadInfo();
  Counter::default_instance_ = new Counter();
  UnReadInfo::default_instance_->InitAsDefaultInstance();
  Counter::default_instance_->InitAsDefaultInstance();
  ::google::protobuf::internal::OnShutdown(&protobuf_ShutdownFile_UnReadInfoBuf_2eproto);
}

// Force AddDescriptors() to be called at static initialization time.
struct StaticDescriptorInitializer_UnReadInfoBuf_2eproto {
  StaticDescriptorInitializer_UnReadInfoBuf_2eproto() {
    protobuf_AddDesc_UnReadInfoBuf_2eproto();
  }
} static_descriptor_initializer_UnReadInfoBuf_2eproto_;

// ===================================================================

#ifndef _MSC_VER
const int UnReadInfo::kUnReadSizeFieldNumber;
const int UnReadInfo::kUidsFieldNumber;
#endif  // !_MSC_VER

UnReadInfo::UnReadInfo()
  : ::google::protobuf::Message() {
  SharedCtor();
}

void UnReadInfo::InitAsDefaultInstance() {
}

UnReadInfo::UnReadInfo(const UnReadInfo& from)
  : ::google::protobuf::Message() {
  SharedCtor();
  MergeFrom(from);
}

void UnReadInfo::SharedCtor() {
  _cached_size_ = 0;
  unreadsize_ = 0;
  ::memset(_has_bits_, 0, sizeof(_has_bits_));
}

UnReadInfo::~UnReadInfo() {
  SharedDtor();
}

void UnReadInfo::SharedDtor() {
  if (this != default_instance_) {
  }
}

void UnReadInfo::SetCachedSize(int size) const {
  GOOGLE_SAFE_CONCURRENT_WRITES_BEGIN();
  _cached_size_ = size;
  GOOGLE_SAFE_CONCURRENT_WRITES_END();
}
const ::google::protobuf::Descriptor* UnReadInfo::descriptor() {
  protobuf_AssignDescriptorsOnce();
  return UnReadInfo_descriptor_;
}

const UnReadInfo& UnReadInfo::default_instance() {
  if (default_instance_ == NULL) protobuf_AddDesc_UnReadInfoBuf_2eproto();
  return *default_instance_;
}

UnReadInfo* UnReadInfo::default_instance_ = NULL;

UnReadInfo* UnReadInfo::New() const {
  return new UnReadInfo;
}

void UnReadInfo::Clear() {
  if (_has_bits_[0 / 32] & (0xffu << (0 % 32))) {
    unreadsize_ = 0;
  }
  uids_.Clear();
  ::memset(_has_bits_, 0, sizeof(_has_bits_));
  mutable_unknown_fields()->Clear();
}

bool UnReadInfo::MergePartialFromCodedStream(
    ::google::protobuf::io::CodedInputStream* input) {
#define DO_(EXPRESSION) if (!(EXPRESSION)) return false
  ::google::protobuf::uint32 tag;
  while ((tag = input->ReadTag()) != 0) {
    switch (::google::protobuf::internal::WireFormatLite::GetTagFieldNumber(tag)) {
      // required int32 unReadSize = 1;
      case 1: {
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_VARINT) {
          DO_((::google::protobuf::internal::WireFormatLite::ReadPrimitive<
                   ::google::protobuf::int32, ::google::protobuf::internal::WireFormatLite::TYPE_INT32>(
                 input, &unreadsize_)));
          set_has_unreadsize();
        } else {
          goto handle_uninterpreted;
        }
        if (input->ExpectTag(18)) goto parse_uids;
        break;
      }

      // repeated .com.huizhi.im.protobuf.Counter uids = 2;
      case 2: {
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_LENGTH_DELIMITED) {
         parse_uids:
          DO_(::google::protobuf::internal::WireFormatLite::ReadMessageNoVirtual(
                input, add_uids()));
        } else {
          goto handle_uninterpreted;
        }
        if (input->ExpectTag(18)) goto parse_uids;
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

void UnReadInfo::SerializeWithCachedSizes(
    ::google::protobuf::io::CodedOutputStream* output) const {
  // required int32 unReadSize = 1;
  if (has_unreadsize()) {
    ::google::protobuf::internal::WireFormatLite::WriteInt32(1, this->unreadsize(), output);
  }

  // repeated .com.huizhi.im.protobuf.Counter uids = 2;
  for (int i = 0; i < this->uids_size(); i++) {
    ::google::protobuf::internal::WireFormatLite::WriteMessageMaybeToArray(
      2, this->uids(i), output);
  }

  if (!unknown_fields().empty()) {
    ::google::protobuf::internal::WireFormat::SerializeUnknownFields(
        unknown_fields(), output);
  }
}

::google::protobuf::uint8* UnReadInfo::SerializeWithCachedSizesToArray(
    ::google::protobuf::uint8* target) const {
  // required int32 unReadSize = 1;
  if (has_unreadsize()) {
    target = ::google::protobuf::internal::WireFormatLite::WriteInt32ToArray(1, this->unreadsize(), target);
  }

  // repeated .com.huizhi.im.protobuf.Counter uids = 2;
  for (int i = 0; i < this->uids_size(); i++) {
    target = ::google::protobuf::internal::WireFormatLite::
      WriteMessageNoVirtualToArray(
        2, this->uids(i), target);
  }

  if (!unknown_fields().empty()) {
    target = ::google::protobuf::internal::WireFormat::SerializeUnknownFieldsToArray(
        unknown_fields(), target);
  }
  return target;
}

int UnReadInfo::ByteSize() const {
  int total_size = 0;

  if (_has_bits_[0 / 32] & (0xffu << (0 % 32))) {
    // required int32 unReadSize = 1;
    if (has_unreadsize()) {
      total_size += 1 +
        ::google::protobuf::internal::WireFormatLite::Int32Size(
          this->unreadsize());
    }

  }
  // repeated .com.huizhi.im.protobuf.Counter uids = 2;
  total_size += 1 * this->uids_size();
  for (int i = 0; i < this->uids_size(); i++) {
    total_size +=
      ::google::protobuf::internal::WireFormatLite::MessageSizeNoVirtual(
        this->uids(i));
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

void UnReadInfo::MergeFrom(const ::google::protobuf::Message& from) {
  GOOGLE_CHECK_NE(&from, this);
  const UnReadInfo* source =
    ::google::protobuf::internal::dynamic_cast_if_available<const UnReadInfo*>(
      &from);
  if (source == NULL) {
    ::google::protobuf::internal::ReflectionOps::Merge(from, this);
  } else {
    MergeFrom(*source);
  }
}

void UnReadInfo::MergeFrom(const UnReadInfo& from) {
  GOOGLE_CHECK_NE(&from, this);
  uids_.MergeFrom(from.uids_);
  if (from._has_bits_[0 / 32] & (0xffu << (0 % 32))) {
    if (from.has_unreadsize()) {
      set_unreadsize(from.unreadsize());
    }
  }
  mutable_unknown_fields()->MergeFrom(from.unknown_fields());
}

void UnReadInfo::CopyFrom(const ::google::protobuf::Message& from) {
  if (&from == this) return;
  Clear();
  MergeFrom(from);
}

void UnReadInfo::CopyFrom(const UnReadInfo& from) {
  if (&from == this) return;
  Clear();
  MergeFrom(from);
}

bool UnReadInfo::IsInitialized() const {
  if ((_has_bits_[0] & 0x00000001) != 0x00000001) return false;

  for (int i = 0; i < uids_size(); i++) {
    if (!this->uids(i).IsInitialized()) return false;
  }
  return true;
}

void UnReadInfo::Swap(UnReadInfo* other) {
  if (other != this) {
    std::swap(unreadsize_, other->unreadsize_);
    uids_.Swap(&other->uids_);
    std::swap(_has_bits_[0], other->_has_bits_[0]);
    _unknown_fields_.Swap(&other->_unknown_fields_);
    std::swap(_cached_size_, other->_cached_size_);
  }
}

::google::protobuf::Metadata UnReadInfo::GetMetadata() const {
  protobuf_AssignDescriptorsOnce();
  ::google::protobuf::Metadata metadata;
  metadata.descriptor = UnReadInfo_descriptor_;
  metadata.reflection = UnReadInfo_reflection_;
  return metadata;
}


// ===================================================================

#ifndef _MSC_VER
const int Counter::kUidFieldNumber;
const int Counter::kCountFieldNumber;
#endif  // !_MSC_VER

Counter::Counter()
  : ::google::protobuf::Message() {
  SharedCtor();
}

void Counter::InitAsDefaultInstance() {
}

Counter::Counter(const Counter& from)
  : ::google::protobuf::Message() {
  SharedCtor();
  MergeFrom(from);
}

void Counter::SharedCtor() {
  _cached_size_ = 0;
  uid_ = 0;
  count_ = 0;
  ::memset(_has_bits_, 0, sizeof(_has_bits_));
}

Counter::~Counter() {
  SharedDtor();
}

void Counter::SharedDtor() {
  if (this != default_instance_) {
  }
}

void Counter::SetCachedSize(int size) const {
  GOOGLE_SAFE_CONCURRENT_WRITES_BEGIN();
  _cached_size_ = size;
  GOOGLE_SAFE_CONCURRENT_WRITES_END();
}
const ::google::protobuf::Descriptor* Counter::descriptor() {
  protobuf_AssignDescriptorsOnce();
  return Counter_descriptor_;
}

const Counter& Counter::default_instance() {
  if (default_instance_ == NULL) protobuf_AddDesc_UnReadInfoBuf_2eproto();
  return *default_instance_;
}

Counter* Counter::default_instance_ = NULL;

Counter* Counter::New() const {
  return new Counter;
}

void Counter::Clear() {
  if (_has_bits_[0 / 32] & (0xffu << (0 % 32))) {
    uid_ = 0;
    count_ = 0;
  }
  ::memset(_has_bits_, 0, sizeof(_has_bits_));
  mutable_unknown_fields()->Clear();
}

bool Counter::MergePartialFromCodedStream(
    ::google::protobuf::io::CodedInputStream* input) {
#define DO_(EXPRESSION) if (!(EXPRESSION)) return false
  ::google::protobuf::uint32 tag;
  while ((tag = input->ReadTag()) != 0) {
    switch (::google::protobuf::internal::WireFormatLite::GetTagFieldNumber(tag)) {
      // required int32 uid = 1;
      case 1: {
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_VARINT) {
          DO_((::google::protobuf::internal::WireFormatLite::ReadPrimitive<
                   ::google::protobuf::int32, ::google::protobuf::internal::WireFormatLite::TYPE_INT32>(
                 input, &uid_)));
          set_has_uid();
        } else {
          goto handle_uninterpreted;
        }
        if (input->ExpectTag(16)) goto parse_count;
        break;
      }

      // required int32 count = 2;
      case 2: {
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_VARINT) {
         parse_count:
          DO_((::google::protobuf::internal::WireFormatLite::ReadPrimitive<
                   ::google::protobuf::int32, ::google::protobuf::internal::WireFormatLite::TYPE_INT32>(
                 input, &count_)));
          set_has_count();
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

void Counter::SerializeWithCachedSizes(
    ::google::protobuf::io::CodedOutputStream* output) const {
  // required int32 uid = 1;
  if (has_uid()) {
    ::google::protobuf::internal::WireFormatLite::WriteInt32(1, this->uid(), output);
  }

  // required int32 count = 2;
  if (has_count()) {
    ::google::protobuf::internal::WireFormatLite::WriteInt32(2, this->count(), output);
  }

  if (!unknown_fields().empty()) {
    ::google::protobuf::internal::WireFormat::SerializeUnknownFields(
        unknown_fields(), output);
  }
}

::google::protobuf::uint8* Counter::SerializeWithCachedSizesToArray(
    ::google::protobuf::uint8* target) const {
  // required int32 uid = 1;
  if (has_uid()) {
    target = ::google::protobuf::internal::WireFormatLite::WriteInt32ToArray(1, this->uid(), target);
  }

  // required int32 count = 2;
  if (has_count()) {
    target = ::google::protobuf::internal::WireFormatLite::WriteInt32ToArray(2, this->count(), target);
  }

  if (!unknown_fields().empty()) {
    target = ::google::protobuf::internal::WireFormat::SerializeUnknownFieldsToArray(
        unknown_fields(), target);
  }
  return target;
}

int Counter::ByteSize() const {
  int total_size = 0;

  if (_has_bits_[0 / 32] & (0xffu << (0 % 32))) {
    // required int32 uid = 1;
    if (has_uid()) {
      total_size += 1 +
        ::google::protobuf::internal::WireFormatLite::Int32Size(
          this->uid());
    }

    // required int32 count = 2;
    if (has_count()) {
      total_size += 1 +
        ::google::protobuf::internal::WireFormatLite::Int32Size(
          this->count());
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

void Counter::MergeFrom(const ::google::protobuf::Message& from) {
  GOOGLE_CHECK_NE(&from, this);
  const Counter* source =
    ::google::protobuf::internal::dynamic_cast_if_available<const Counter*>(
      &from);
  if (source == NULL) {
    ::google::protobuf::internal::ReflectionOps::Merge(from, this);
  } else {
    MergeFrom(*source);
  }
}

void Counter::MergeFrom(const Counter& from) {
  GOOGLE_CHECK_NE(&from, this);
  if (from._has_bits_[0 / 32] & (0xffu << (0 % 32))) {
    if (from.has_uid()) {
      set_uid(from.uid());
    }
    if (from.has_count()) {
      set_count(from.count());
    }
  }
  mutable_unknown_fields()->MergeFrom(from.unknown_fields());
}

void Counter::CopyFrom(const ::google::protobuf::Message& from) {
  if (&from == this) return;
  Clear();
  MergeFrom(from);
}

void Counter::CopyFrom(const Counter& from) {
  if (&from == this) return;
  Clear();
  MergeFrom(from);
}

bool Counter::IsInitialized() const {
  if ((_has_bits_[0] & 0x00000003) != 0x00000003) return false;

  return true;
}

void Counter::Swap(Counter* other) {
  if (other != this) {
    std::swap(uid_, other->uid_);
    std::swap(count_, other->count_);
    std::swap(_has_bits_[0], other->_has_bits_[0]);
    _unknown_fields_.Swap(&other->_unknown_fields_);
    std::swap(_cached_size_, other->_cached_size_);
  }
}

::google::protobuf::Metadata Counter::GetMetadata() const {
  protobuf_AssignDescriptorsOnce();
  ::google::protobuf::Metadata metadata;
  metadata.descriptor = Counter_descriptor_;
  metadata.reflection = Counter_reflection_;
  return metadata;
}


// @@protoc_insertion_point(namespace_scope)

}  // namespace protobuf
}  // namespace im
}  // namespace huizhi
}  // namespace com

// @@protoc_insertion_point(global_scope)
