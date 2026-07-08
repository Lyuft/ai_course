package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.dto.UserDTO;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {
    List<UserDTO> findAll();
    UserDTO findById(Long id);
    void save(UserDTO userDTO);
    void update(Long id, UserDTO userDTO);
    void deleteById(Long id);
    User findByEmail(String email);
}
