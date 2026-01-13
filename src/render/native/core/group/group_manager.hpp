#pragma once

#include <unordered_set>

extern "C" {
    #include "lvgl.h"
};

class BasicComponent;

class GroupManager {
public:
    static GroupManager& getInstance();
    
    lv_group_t* getDefaultGroup();
    
    void registerContainer(BasicComponent* container);
    void unregisterContainer(BasicComponent* container);
    bool isContainerRegistered(BasicComponent* container);
    
    void addToGroup(lv_obj_t* obj);
    void removeFromGroup(lv_obj_t* obj);
    void checkAutoEditMode();
    
private:
    std::unordered_set<BasicComponent*> registered_containers;
    GroupManager() = default;
    GroupManager(const GroupManager&) = delete;
    GroupManager& operator=(const GroupManager&) = delete;
};

