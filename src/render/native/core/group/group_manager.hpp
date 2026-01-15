#pragma once

#include <unordered_set>
#include "native/core/basic/comp.hpp"

extern "C" {
};

class GroupManager {
public:
    static GroupManager& getInstance();
    
    void setInGroupType(BasicComponent* container, int32_t type);
    void unregisterContainer(BasicComponent* container);
    void addChildToDefGroup(BasicComponent* container);
    
private:
    enum EAddToDefGroupType {
        ADD_CHILD_TO_DEF_GROUP = 0,
        ADD_CUR_TO_DEF_GROUP = 1,
        ADD_TO_DEF_GROUP_TYPE_NONE = 2,
    };

    std::unordered_set<lv_obj_t*> parent_instances;
    GroupManager() = default;
    GroupManager(const GroupManager&) = delete;
    GroupManager& operator=(const GroupManager&) = delete;
};
