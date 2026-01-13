#include "group_manager.hpp"

GroupManager& GroupManager::getInstance() {
    static GroupManager instance;
    return instance;
}

lv_group_t* GroupManager::getDefaultGroup() {
    return lv_group_get_default();
}

void GroupManager::registerContainer(BasicComponent* container) {
    if (container) {
        registered_containers.insert(container);
    }
}

void GroupManager::unregisterContainer(BasicComponent* container) {
    registered_containers.erase(container);
}

bool GroupManager::isContainerRegistered(BasicComponent* container) {
    return registered_containers.count(container) > 0;
}

void GroupManager::addToGroup(lv_obj_t* obj) {
    lv_group_t* group = getDefaultGroup();
    if (group && obj) {
        lv_group_add_obj(group, obj);
        checkAutoEditMode();
    }
}

void GroupManager::removeFromGroup(lv_obj_t* obj) {
    if (obj) {
        lv_group_remove_obj(obj);
        checkAutoEditMode();
    }
}

void GroupManager::checkAutoEditMode() {
    lv_group_t* group = getDefaultGroup();
    if (!group) return;
    
    uint32_t count = lv_group_get_obj_count(group);
    if (count == 1) {
        lv_obj_t* focused = lv_group_get_focused(group);
        if (focused && lv_obj_is_editable(focused)) {
            lv_group_set_editing(group, true);
        }
    } else if (count > 1) {
        lv_group_set_editing(group, false);
    }
}

