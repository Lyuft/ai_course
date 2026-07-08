package ru.kata.spring.boot_security.demo.dto;

import jakarta.validation.constraints.*;
import java.util.Set;

public class UserDTO {
    private Long id;

    @NotEmpty(message = "Name should be not empty")
    @Size(min = 2, max = 30, message = "Name wrong size")
    private String firstName;

    @NotEmpty(message = "LastName should be not empty")
    @Size(min = 2, max = 30, message = "Name wrong size")
    private String lastName;

    @NotNull(message = "Age should be not empty")
    @Min(value = 18, message = "Age > 18")
    @Max(value = 150, message = "Age < 150")
    private Integer age;

    @NotEmpty(message = "Email should be not empty")
    @Size(min = 2, max = 100, message = "Email size error")
    private String email;

    @NotEmpty(message = "Password should be not empty")
    private String password;

    @NotEmpty(message = "Не выбрана ни одна роль")
    private Set<RoleDTO> roles;

    public UserDTO() {
        // Required by framework for deserialization
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<RoleDTO> getRoles() {
        return roles;
    }

    public void setRoles(Set<RoleDTO> roles) {
        this.roles = roles;
    }
}
