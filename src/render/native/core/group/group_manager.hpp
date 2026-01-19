#pragma once

#include <unordered_set>
#include "native/core/basic/comp.hpp"

class GroupManager {
public:
    static GroupManager& getInstance();
    
    void addToFocusGroup(BasicComponent* container);
    void reorderFocusGroup(BasicComponent* parent);
    
private:
    GroupManager() = default;
    GroupManager(const GroupManager&) = delete;
    GroupManager& operator=(const GroupManager&) = delete;
};
